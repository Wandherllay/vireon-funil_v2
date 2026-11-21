import { createFileRoute } from "@tanstack/react-router";
import { TrickClient as Page } from "@/vireon/m/module-8800.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/protocol")({
  head: () => pageHead("The Baking Soda Trick"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
