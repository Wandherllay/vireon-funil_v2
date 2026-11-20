import { createFileRoute } from "@tanstack/react-router";
import { AdminSettingsClient as Page } from "@/vireon/m/module-991.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/admin/settings")({
  head: () => pageHead("Settings · Admin"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
