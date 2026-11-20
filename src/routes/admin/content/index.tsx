import { createFileRoute } from "@tanstack/react-router";
import { ContentClient as Page } from "@/vireon/m/module-7038.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/content/")({
  head: () => pageHead("Content · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
