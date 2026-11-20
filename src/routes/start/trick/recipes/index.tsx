import { createFileRoute } from "@tanstack/react-router";
import { RecipesClient as Page } from "@/vireon/m/module-6552.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/recipes/")({
  head: () => pageHead("Recipes"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
