import { createFileRoute } from "@tanstack/react-router";
import { InviteClient as Page } from "@/vireon/m/module-830.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/invite/$token")({
  head: () => pageHead("Invitation"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
