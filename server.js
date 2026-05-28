import { createServer } from "node:http";
import { readFile, rename, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 3000);
const ROOT = resolve(".");
const DB_PATH = join(ROOT, "data", "db.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

const allowedDealPatchFields = new Set([
  "stage",
  "sl",
  "inv",
  "ip",
  "nextAction",
  "actionDate",
  "actionISO",
  "aurg",
  "nda",
  "agr",
  "agreementSigned",
  "agreementSentDate",
  "agreementSignedDate",
  "agreementLink",
  "docs",
  "firstInvoiceRaised",
  "paymentTermDays",
  "partialInvoice",
  "firstInvoiceAmount",
  "recurringAmount",
  "invoiceDay",
  "churnRisk",
  "churnNotes",
  "durationMonths",
  "mrrI",
  "inum",
  "raised",
  "due",
  "paid",
  "ren",
  "rm"
]);

function send(res, status, body, contentType = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "content-type": contentType,
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PATCH,OPTIONS",
    "access-control-allow-headers": "content-type"
  });
  if (Buffer.isBuffer(body)) return res.end(body);
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

async function readJsonBody(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  if (!raw.trim()) return {};

  try {
    return JSON.parse(raw);
  } catch {
    const err = new Error("Request body must be valid JSON.");
    err.status = 400;
    throw err;
  }
}

async function readDb() {
  const db = JSON.parse(await readFile(DB_PATH, "utf8"));
  return {
    deals: Array.isArray(db.deals) ? db.deals : [],
    churned: Array.isArray(db.churned) ? db.churned : []
  };
}

async function writeDb(db) {
  const tempPath = `${DB_PATH}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(db, null, 2)}\n`);
  await rename(tempPath, DB_PATH);
}

function sanitizeDeal(input) {
  if (!input || typeof input !== "object") {
    const err = new Error("Deal payload is required.");
    err.status = 400;
    throw err;
  }

  const name = String(input.name || "").trim();
  if (!name) {
    const err = new Error("Deal name is required.");
    err.status = 400;
    throw err;
  }

  return {
    ...input,
    id: Number(input.id || Date.now()),
    name,
    type: input.type === "onetime" ? "onetime" : "MRR",
    amt: Number(input.amt || 0),
    ip: Number(input.ip || 0),
    mrrI: Array.isArray(input.mrrI) ? input.mrrI : [],
    journey: Array.isArray(input.journey) ? input.journey : []
  };
}

function sanitizePatch(input) {
  if (!input || typeof input !== "object") {
    const err = new Error("Patch payload is required.");
    err.status = 400;
    throw err;
  }

  return Object.fromEntries(
    Object.entries(input).filter(([key]) => allowedDealPatchFields.has(key))
  );
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") return send(res, 204, "");

  if (req.method === "GET" && url.pathname === "/api/health") {
    return send(res, 200, { ok: true });
  }

  if (req.method === "GET" && url.pathname === "/api/state") {
    return send(res, 200, await readDb());
  }

  if (req.method === "POST" && url.pathname === "/api/deals") {
    const body = await readJsonBody(req);
    const db = await readDb();
    const deal = sanitizeDeal(body.deal || body);
    db.deals.unshift(deal);
    await writeDb(db);
    return send(res, 201, deal);
  }

  const dealMatch = url.pathname.match(/^\/api\/deals\/(\d+)$/);
  if (req.method === "PATCH" && dealMatch) {
    const id = Number(dealMatch[1]);
    const patch = sanitizePatch(await readJsonBody(req));
    const db = await readDb();
    const index = db.deals.findIndex((deal) => Number(deal.id) === id);

    if (index === -1) return send(res, 404, { error: "Deal not found." });
    if (Object.keys(patch).length === 0) {
      return send(res, 400, { error: "No supported fields to update." });
    }

    db.deals[index] = { ...db.deals[index], ...patch };
    await writeDb(db);
    return send(res, 200, db.deals[index]);
  }

  return send(res, 404, { error: "API route not found." });
}

async function serveStatic(req, res, url) {
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = resolve(ROOT, `.${requestedPath}`);

  if (!filePath.startsWith(ROOT) || !existsSync(filePath)) {
    return send(res, 404, "Not found", "text/plain; charset=utf-8");
  }

  const ext = extname(filePath).toLowerCase();
  const content = await readFile(filePath);
  send(res, 200, content, mimeTypes[ext] || "application/octet-stream");
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      return await handleApi(req, res, url);
    }
    return await serveStatic(req, res, url);
  } catch (err) {
    send(res, err.status || 500, { error: err.message || "Server error." });
  }
});

export { readDb, sanitizeDeal, sanitizePatch };

if (process.env.NODE_ENV !== "test") {
  server.on("error", (err) => {
    console.error(`Could not start backend on ${HOST}:${PORT}: ${err.message}`);
    process.exit(1);
  });

  server.listen(PORT, HOST, () => {
    console.log(`SalesOps dashboard running at http://${HOST}:${PORT}`);
  });
}
