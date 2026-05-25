import {
  errorResponse,
  handleApiError,
  jsonResponse,
  readDb,
  readJson,
  sanitizePatch,
  writeDb
} from "../_utils.js";

export async function onRequestPatch({ request, env, params }) {
  try {
    const id = Number(params.id);
    const patch = sanitizePatch(await readJson(request));
    const db = await readDb(env);
    const index = db.deals.findIndex((deal) => Number(deal.id) === id);

    if (index === -1) return errorResponse("Deal not found.", 404);
    if (Object.keys(patch).length === 0) {
      return errorResponse("No supported fields to update.", 400);
    }

    db.deals[index] = { ...db.deals[index], ...patch };
    await writeDb(env, db);

    return jsonResponse(db.deals[index]);
  } catch (error) {
    return handleApiError(error);
  }
}
