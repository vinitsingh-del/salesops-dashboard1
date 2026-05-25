import { jsonResponse } from "./_utils.js";

export function onRequestGet() {
  return jsonResponse({ ok: true });
}
