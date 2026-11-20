import { createFileRoute } from "@tanstack/react-router";
import { DiscoverClient as Page } from "@/vireon/m/module-7956.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/discover/")({
  head: () => pageHead("Discover"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
