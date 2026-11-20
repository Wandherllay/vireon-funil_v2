import { createFileRoute } from "@tanstack/react-router";
import { Thanks as Page } from "@/vireon/m/module-531.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/thanks")({
  head: () => pageHead("Thank you for your purchase"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
