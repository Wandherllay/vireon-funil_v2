import { createFileRoute } from "@tanstack/react-router";
import { ItemClient as Page } from "@/vireon/m/module-4969.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/discover/$category/$slug")({
  head: () => pageHead("Discover"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page category={params.category} slug={params.slug} />;
}
