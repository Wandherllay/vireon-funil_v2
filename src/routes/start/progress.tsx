import { createFileRoute } from "@tanstack/react-router";
import { ProgressClient as Page } from "@/vireon/m/module-1156.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/progress")({
  head: () => pageHead("Progress"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
