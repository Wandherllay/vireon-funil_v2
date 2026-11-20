import { createFileRoute } from "@tanstack/react-router";
import { SettingsClient as Page } from "@/vireon/m/module-9330.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/settings")({
  head: () => pageHead("Settings"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
