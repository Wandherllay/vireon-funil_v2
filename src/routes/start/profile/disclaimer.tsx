import { createFileRoute } from "@tanstack/react-router";
import { DisclaimerClient as Page } from "@/vireon/m/module-9548.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/disclaimer")({
  head: () => pageHead("Disclaimer"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
