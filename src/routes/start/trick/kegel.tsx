import { createFileRoute } from "@tanstack/react-router";
import { KegelClient as Page } from "@/vireon/m/module-6293.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/kegel")({
  head: () => pageHead("Kegel"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
