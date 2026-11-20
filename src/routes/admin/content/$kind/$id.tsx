import { createFileRoute } from "@tanstack/react-router";
import { ItemEditor as Page } from "@/vireon/m/module-8718.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/content/$kind/$id")({
  head: () => pageHead("Content · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page kind={params.kind} itemId={params.id} />;
}
