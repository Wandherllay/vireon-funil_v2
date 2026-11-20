import { createFileRoute } from "@tanstack/react-router";
import { UpsellShell as Shell } from "@/vireon/m/module-9563.jsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpsellShell = Shell as (props: any) => React.ReactElement;
import { up1 } from "@/vireon/upsells";
import { pageHead } from "@/vireon/meta";

export const Route = createFileRoute("/up1")({
  head: () => pageHead("Acelerador Clínico — Erecciones de Acero en 7 Días"),
  component: () => <UpsellShell {...up1} />,
});
