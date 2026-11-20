// Preserve /v2 on internal links without changing external URLs.
export const BASE_PATH = "/v2";
export function withBasePath(href) {
  if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === BASE_PATH || href.startsWith(BASE_PATH + "/") || href.startsWith(BASE_PATH + "?") || href.startsWith(BASE_PATH + "#")) return href;
  return BASE_PATH + href;
}
