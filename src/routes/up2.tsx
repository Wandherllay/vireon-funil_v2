import { createFileRoute } from "@tanstack/react-router";
import { UpsellShell as Shell } from "@/vireon/m/module-9563.jsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpsellShell = Shell as (props: any) => React.ReactElement;
import { up2 } from "@/vireon/upsells";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/up2")({
  head: () => pageHead("Manual del Actor — Hazla Gritar Toda la Noche"),
  component: () => <UpsellShell {...up2} />,
});
