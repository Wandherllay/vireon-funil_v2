import { createFileRoute } from "@tanstack/react-router";
import { TonicClient as Page } from "@/vireon/m/module-7826.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/tonic")({
  head: () => pageHead("Tonic"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
