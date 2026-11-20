import { createFileRoute } from "@tanstack/react-router";
import { ProfileClient as Page } from "@/vireon/m/module-2714.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/profile/")({
  head: () => pageHead("Profile"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
