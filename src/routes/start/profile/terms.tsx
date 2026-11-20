import { createFileRoute } from "@tanstack/react-router";
import { TermsClient as Page } from "@/vireon/m/module-8.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/terms")({
  head: () => pageHead("Terms"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
