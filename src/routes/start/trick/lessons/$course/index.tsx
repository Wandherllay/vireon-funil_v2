import { createFileRoute } from "@tanstack/react-router";
import { CourseClient as Page } from "@/vireon/m/module-7290.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/lessons/$course/")({
  head: () => pageHead("Lessons"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page slug={params.course} />;
}
