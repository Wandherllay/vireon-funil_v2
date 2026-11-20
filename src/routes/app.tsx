import { createFileRoute, redirect } from "@tanstack/react-router";

// /app always sends members to /start, like the original site.
export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    throw redirect({ to: "/start" });
  },
});
