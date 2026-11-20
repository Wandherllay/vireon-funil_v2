import { createFileRoute } from "@tanstack/react-router";
import { LessonsClient as Page } from "@/vireon/m/module-778.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/lessons/")({
  head: () => pageHead("Lessons"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
