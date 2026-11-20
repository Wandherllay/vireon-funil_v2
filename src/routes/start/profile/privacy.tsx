import { createFileRoute } from "@tanstack/react-router";
import { PrivacyClient as Page } from "@/vireon/m/module-9121.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/privacy")({
  head: () => pageHead("Privacy"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
