import { createFileRoute } from "@tanstack/react-router";
import { AdminHome as Page } from "@/vireon/m/module-4920.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/")({
  head: () => pageHead("Home · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
