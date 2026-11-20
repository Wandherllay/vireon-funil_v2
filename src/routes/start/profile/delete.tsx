import { createFileRoute } from "@tanstack/react-router";
import { DeleteClient as Page } from "@/vireon/m/module-332.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/delete")({
  head: () => pageHead("Delete account"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
