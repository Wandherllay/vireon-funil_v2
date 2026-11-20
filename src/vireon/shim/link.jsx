// Minimal next/link replacement: real <a href> with client-side navigation.
import { forwardRef } from "react";
import { useRouter } from "@tanstack/react-router";
import { withBasePath } from "./paths.js";

const Link = forwardRef(function Link(
  { href, prefetch, replace, scroll, shallow, passHref, legacyBehavior, locale, onClick, target, ...rest },
  ref,
) {
  const router = useRouter();
  const url = typeof href === "string" ? href : href?.pathname ?? "/";
  const resolvedUrl = withBasePath(url);
  return (
    <a
      ref={ref}
      href={resolvedUrl}
      target={target}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (target && target !== "_self") return;
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (/^(https?:)?\/\//.test(url) || url.startsWith("mailto:") || url.startsWith("tel:")) return;
        if (url.startsWith("#")) return;
        e.preventDefault();
        if (replace) router.history.replace(resolvedUrl);
        else router.history.push(resolvedUrl);
        if (scroll !== false) window.scrollTo(0, 0);
      }}
      {...rest}
    />
  );
});

export default Link;
