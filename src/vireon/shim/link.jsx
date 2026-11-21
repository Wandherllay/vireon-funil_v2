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
        if (typeof window !== "undefined" && typeof window.vireonTrack === "function") {
          try {
            const destination = new URL(resolvedUrl, window.location.href);
            if (destination.hostname === "go.centerpag.com" || destination.hostname === "checkout.centerpag.com") {
              window.vireonTrack("checkout_click", "perfectpay_redirect");
            } else if (destination.origin === window.location.origin && destination.pathname.startsWith("/v2/") && destination.pathname !== window.location.pathname) {
              window.vireonTrack("step_click", destination.pathname.slice(0, 64));
            }
          } catch (_) {}
        }
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
