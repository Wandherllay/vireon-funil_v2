import { createFileRoute } from "@tanstack/react-router";
import { TonicDetailClient as Page } from "@/vireon/m/tonic-detail.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/tonic/$id")({
  head: () => pageHead("Tonic"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page id={params.id} />;
}
