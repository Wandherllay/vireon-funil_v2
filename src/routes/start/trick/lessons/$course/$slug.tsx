import { createFileRoute } from "@tanstack/react-router";
import { LessonClient as Page } from "@/vireon/m/module-4165.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/lessons/$course/$slug")({
  head: () => pageHead("Lessons"),
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  return <Page courseSlug={params.course} lessonSlug={params.slug} />;
}
