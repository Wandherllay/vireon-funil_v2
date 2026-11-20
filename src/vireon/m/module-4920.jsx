// @ts-nocheck
/* eslint-disable */

import _l from "../shim/link.jsx";
import * as n from "./module-7629.jsx";
import * as m from "./module-3677.jsx";
import * as d from "./module-6390.jsx";
export function AdminHome() {
    let { t, lang } = m.s9();
    let { ready, counts, activity, people } = d.z8();
    let x = people.find((e)=>e.role === "admin");
    let p = [
        {
            title: t("admin.home.invite"),
            text: t("admin.home.inviteText"),
            href: "/admin/invites"
        },
        {
            title: t("admin.home.people"),
            text: t("admin.home.peopleText"),
            href: "/admin/people"
        },
        {
            title: t("admin.home.content"),
            text: t("admin.home.contentText"),
            href: "/admin/content"
        }
    ];
    let o = [
        {
            value: counts.accounts,
            label: t("admin.home.accounts")
        },
        {
            value: counts.activeMembers,
            label: t("admin.home.active")
        },
        {
            value: counts.suspended,
            label: t("admin.home.suspended")
        },
        {
            value: counts.programsStarted,
            label: t("admin.home.started")
        }
    ];
    return <n.i><div className="space-y-4"><h1 className="font-display text-3xl">{t("admin.home.title")}</h1><p className="text-sm text-mist">{t("admin.home.sub")}</p><div className="grid gap-3 sm:grid-cols-2">{p.map((e)=><_l key={e.href} href={e.href} className="block"><section className="app-card p-5 transition hover:border-accent/40"><p className="font-semibold">{e.title}</p><p className="mt-1 text-sm text-mist">{e.text}</p></section></_l>)}</div>{counts.sampleData && <p className="rounded-2xl border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-warn">{t("admin.home.sample")}</p>}<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{o.map((e)=><section key={e.label} className="app-card p-4"><p className="text-[10px] uppercase leading-tight tracking-[0.12em] text-faint">{e.label}</p><p className="mt-2 font-display text-3xl">{ready ? e.value : "—"}</p></section>)}</div><section className="app-card p-5"><h2 className="font-display text-xl">{t("admin.home.activity")}</h2>{activity.length === 0 ? <p className="mt-2 text-sm text-mist">{t("admin.home.empty")}</p> : <ul className="mt-3 space-y-2 text-sm text-mist">{activity.map((s)=><li key={s.id}>{s.isSample && <span className="mr-1.5 text-[10px] font-bold uppercase text-faint">{t("admin.sampleShort")}</span>}{s.summary}<span className="ml-2 text-[10px] text-faint">{new Date(s.at).toLocaleString(m.ne[lang])}</span></li>)}</ul>}</section><p className="sr-only">{x?.firstName}</p></div></n.i>;
}
