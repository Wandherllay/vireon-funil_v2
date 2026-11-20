const DESCRIPTION =
  "Educational wellness protocol for men. Test your dose, follow the protocol and track your habits.";

/** Per-page head tags, matching the original site's titles. */
export function pageHead(title: string) {
  const full = title === "Vireon Protocol" ? title : `${title} · Vireon Protocol`;
  return {
    meta: [
      { title: full },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: full },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
