import { createFileRoute } from "@tanstack/react-router";
import { Quiz as Page } from "@/vireon/m/module-8056.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/quiz")({
  head: () => pageHead("Vireon Quiz – Your personalized protocol"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
