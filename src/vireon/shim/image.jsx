// Minimal next/image replacement.
function Image({ src, alt = "", fill, priority, quality, sizes, placeholder, blurDataURL, loader, unoptimized, style, ...rest }) {
  const s = typeof src === "string" ? src : src?.src;
  const fillStyle = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : null;
  return (
    <img
      src={s}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      style={{ ...(fillStyle || {}), color: "transparent", ...(style || {}) }}
      {...rest}
    />
  );
}
export default Image;
