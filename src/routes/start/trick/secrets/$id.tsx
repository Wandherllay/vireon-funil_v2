import { createFileRoute } from "@tanstack/react-router";
import { SecretLessonClient as Page } from "@/vireon/m/module-6653.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/secrets/$id")({
  head: () => pageHead("Secrets"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page id={params.id} />;
}
