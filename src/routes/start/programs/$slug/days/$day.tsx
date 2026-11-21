import { createFileRoute } from "@tanstack/react-router";
import { ProgramDayClient as Page } from "@/vireon/m/program-day.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/programs/$slug/days/$day")({
  head: () => pageHead("Programs"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page slug={params.slug} day={params.day} />;
}
