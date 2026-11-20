// Minimal next/navigation replacement on top of TanStack Router.
import { useRouter as useTsRouter, useLocation, useParams as useTsParams } from "@tanstack/react-router";
import { useMemo } from "react";

export function useRouter() {
  const router = useTsRouter();
  return useMemo(
    () => ({
      push: (href) => router.history.push(href),
      replace: (href) => router.history.replace(href),
      back: () => router.history.back(),
      forward: () => router.history.forward(),
      refresh: () => router.invalidate(),
      prefetch: () => {},
    }),
    [router],
  );
}

export function usePathname() {
  return useLocation({ select: (l) => l.pathname });
}

export function useParams() {
  return useTsParams({ strict: false });
}

export function useSearchParams() {
  const search = useLocation({ select: (l) => l.searchStr });
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default { useRouter, usePathname, useParams, useSearchParams };
