import { createFileRoute } from "@tanstack/react-router";
import { CategoryClient as Page } from "@/vireon/m/module-5249.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/discover/$category/")({
  head: () => pageHead("Discover"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page category={params.category} />;
}
