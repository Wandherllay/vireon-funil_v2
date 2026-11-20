import { createFileRoute } from "@tanstack/react-router";
import { DoctorClient as Page } from "@/vireon/m/module-5220.jsx";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/start/trick/doctor")({
  head: () => pageHead("Doctor"),
  component: RouteComponent,
});

function RouteComponent() {
  return <Page />;
}
