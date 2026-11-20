import { createFileRoute } from "@tanstack/react-router";
import { ProgramsClient as Page } from "@/vireon/m/module-5206.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/programs/")({
  head: () => pageHead("Programs"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
