// @ts-nocheck
/* eslint-disable */
import * as c from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";

import A from "../shim/link.jsx";
import * as n from "./module-3677.jsx";
let d = [
    {
        title: "trick.protocol",
        body: "trick.doctor.1",
        href: "/start/trick/protocol"
    },
    {
        title: "trick.lessons",
        body: "trick.doctor.2",
        href: "/start/trick/lessons"
    },
    {
        title: "trick.recipes",
        body: "trick.doctor.3",
        href: "/start/trick/recipes"
    },
    {
        title: "trick.tonic",
        body: "trick.doctor.4",
        href: "/start/trick/tonic"
    },
    {
        title: "trick.kegel",
        body: "trick.doctor.5",
        href: "/start/trick/kegel"
    },
    {
        title: "trick.secrets",
        body: "trick.doctor.6",
        href: "/start/trick/secrets"
    }
];
export function DoctorClient() {
    let { email } = IG();
    let { t } = n.s9();
    return <c.GV current="/start/trick"><c.wc/><div className="space-y-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t("trick.doctor.tag")}</p><h1 className="mt-1 font-display text-3xl">{t("trick.doctor.title")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t("trick.doctor.sub")}</p></div><div className="grid gap-3 sm:grid-cols-2">{d.map((r)=><A key={r.title} href={Op(r.href, email)}><section className="app-card h-full p-4"><h2 className="font-display text-xl">{t(r.title)}</h2><p className="mt-2 text-sm leading-6 text-mist">{t(r.body)}</p></section></A>)}</div><section className="app-card p-5 text-sm leading-6 text-mist"><h2 className="font-display text-xl text-foam">{t("trick.doctor.care")}</h2><p className="mt-2">{t("trick.doctor.careText")}</p></section><aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t("legal.short")}</p><p className="mt-1">{t("legal.line")}</p><p className="mt-1">{t("legal.emergency")}</p></aside></div></c.GV>;
}
