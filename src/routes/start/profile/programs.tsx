import { createFileRoute } from "@tanstack/react-router";
import { CompletedClient as Page } from "@/vireon/m/module-8378.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/programs")({
  head: () => pageHead("Programs"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
