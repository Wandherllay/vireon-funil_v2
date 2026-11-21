import { createFileRoute } from "@tanstack/react-router";
import { ProgramClient as Page } from "@/vireon/m/module-8441.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/programs/$slug/")({
  head: () => pageHead("Programs"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page slug={params.slug} />;
}
