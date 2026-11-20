import { createFileRoute } from "@tanstack/react-router";
import { HelpClient as Page } from "@/vireon/m/module-1748.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/help")({
  head: () => pageHead("Help"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
