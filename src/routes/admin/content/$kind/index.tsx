import { createFileRoute } from "@tanstack/react-router";
import { LibraryClient as Page } from "@/vireon/m/module-1892.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/content/$kind/")({
  head: () => pageHead("Content · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page kind={params.kind} />;
}
