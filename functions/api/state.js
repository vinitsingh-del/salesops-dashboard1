import { handleApiError, jsonResponse, readDb } from "./_utils.js";

export async function onRequestGet({ env }) {
  try {
    return jsonResponse(await readDb(env));
  } catch (error) {
    return handleApiError(error);
  }
}
