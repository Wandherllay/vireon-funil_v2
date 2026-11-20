import { createFileRoute } from "@tanstack/react-router";
import { LoginClient as Page } from "@/vireon/m/module-4633.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/login")({
  head: () => pageHead("Sign in"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
