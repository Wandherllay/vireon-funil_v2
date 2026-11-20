import { createFileRoute } from "@tanstack/react-router";
import { PeopleClient as Page } from "@/vireon/m/module-7627.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/people")({
  head: () => pageHead("People · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
