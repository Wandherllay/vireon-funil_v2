import { createFileRoute } from "@tanstack/react-router";
import Page from "@/vireon/m/module-6603.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/login")({
  head: () => pageHead("Admin sign in"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
