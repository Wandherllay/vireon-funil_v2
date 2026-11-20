import { createFileRoute } from "@tanstack/react-router";
import { RecipeClient as Page } from "@/vireon/m/module-8067.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/recipes/$id")({
  head: () => pageHead("Recipes"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page id={params.id} />;
}
