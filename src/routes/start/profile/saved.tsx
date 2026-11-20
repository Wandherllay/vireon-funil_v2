import { createFileRoute } from "@tanstack/react-router";
import { SavedClient as Page } from "@/vireon/m/module-4536.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/saved")({
  head: () => pageHead("Saved"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
