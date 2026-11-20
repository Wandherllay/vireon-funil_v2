import { createFileRoute } from "@tanstack/react-router";
import { SecretsClient as Page } from "@/vireon/m/module-9166.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/secrets/")({
  head: () => pageHead("Secrets"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
