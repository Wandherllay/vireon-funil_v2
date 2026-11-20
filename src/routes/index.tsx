import { createFileRoute } from "@tanstack/react-router";
import Page from "@/vireon/m/module-7080.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/")({
  head: () => pageHead("Vireon Protocol"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
