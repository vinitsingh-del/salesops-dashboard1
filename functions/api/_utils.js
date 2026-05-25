import { seedDb } from "../data/seed.js";

const DB_KEY = "salesops-db";

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

export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export function errorResponse(message, status = 400) {
  return jsonResponse({ error: message }, status);
}

function getStore(env) {
  if (!env.SALESOPS_KV) {
    throw new Error("Cloudflare KV binding SALESOPS_KV is not configured.");
  }
  return env.SALESOPS_KV;
}

export async function readDb(env) {
  const store = getStore(env);
  const saved = await store.get(DB_KEY, "json");

  if (saved) {
    return {
      deals: Array.isArray(saved.deals) ? saved.deals : [],
      churned: Array.isArray(saved.churned) ? saved.churned : []
    };
  }

  await writeDb(env, seedDb);
  return structuredClone(seedDb);
}

export async function writeDb(env, db) {
  const cleanDb = {
    deals: Array.isArray(db.deals) ? db.deals : [],
    churned: Array.isArray(db.churned) ? db.churned : []
  };
  await getStore(env).put(DB_KEY, JSON.stringify(cleanDb));
  return cleanDb;
}

export async function readJson(request) {
  const text = await request.text();
  if (!text.trim()) return {};

  try {
    return JSON.parse(text);
  } catch {
    const err = new Error("Request body must be valid JSON.");
    err.status = 400;
    throw err;
  }
}

export function sanitizeDeal(input) {
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

export function sanitizePatch(input) {
  if (!input || typeof input !== "object") {
    const err = new Error("Patch payload is required.");
    err.status = 400;
    throw err;
  }

  return Object.fromEntries(
    Object.entries(input).filter(([key]) => allowedDealPatchFields.has(key))
  );
}

export function handleApiError(error) {
  return errorResponse(error.message || "Server error.", error.status || 500);
}
