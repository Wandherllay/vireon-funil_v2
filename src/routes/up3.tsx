import { createFileRoute } from "@tanstack/react-router";
import Page from "@/vireon/m/module-6845.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/up3")({
  head: () => pageHead("Progressive Growth Method — Up to +7 cm in 90 Days"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
