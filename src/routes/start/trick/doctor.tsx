import { createFileRoute, redirect } from "@tanstack/react-router";

// The former "Doctor" page is now the Trick landing page at /start/trick.
export const Route = createFileRoute("/start/trick/doctor")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/start/trick", search: location.search, replace: true });
  },
});
