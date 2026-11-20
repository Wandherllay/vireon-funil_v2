import { createFileRoute } from "@tanstack/react-router";
import { NoticesClient as Page } from "@/vireon/m/module-2825.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/notices")({
  head: () => pageHead("Notices · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
