import {
  handleApiError,
  jsonResponse,
  readDb,
  readJson,
  sanitizeDeal,
  writeDb
} from "./_utils.js";

export async function onRequestPost({ request, env }) {
  try {
    const body = await readJson(request);
    const db = await readDb(env);
    const deal = sanitizeDeal(body.deal || body);

    db.deals.unshift(deal);
    await writeDb(env, db);

    return jsonResponse(deal, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
