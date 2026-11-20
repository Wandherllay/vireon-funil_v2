import { createFileRoute } from "@tanstack/react-router";
import { InvitesClient as Page } from "@/vireon/m/module-7115.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/invites")({
  head: () => pageHead("Invites · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
