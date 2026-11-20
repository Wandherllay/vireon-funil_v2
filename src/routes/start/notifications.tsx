import { createFileRoute } from "@tanstack/react-router";
import { NotificationsClient as Page } from "@/vireon/m/module-1701.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/notifications")({
  head: () => pageHead("Notifications"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
