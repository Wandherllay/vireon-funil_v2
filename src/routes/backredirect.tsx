import { createFileRoute } from "@tanstack/react-router";
import { BackRedirect as Page } from "@/vireon/m/module-2253.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/backredirect")({
  head: () => pageHead("Vireon — Wait, your price dropped"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
