import { createFileRoute } from "@tanstack/react-router";
import { Offer as Page } from "@/vireon/m/module-8014.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/offer")({
  head: () => pageHead("Vireon – Dr Michael Thompson's protocol for men"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
