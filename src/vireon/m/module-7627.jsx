// @ts-nocheck
/* eslint-disable */

import * as l from "react";
import * as n from "./module-7629.jsx";
import * as i from "./module-3677.jsx";
import * as c from "./module-6390.jsx";
export function PeopleClient() {
    let { t } = i.s9();
    let { ready, people, toggleStatus, toggleAccess } = c.z8();
    let [d, setD] = l.useState("");
    let [r, setR] = l.useState("");
    let [u, setU] = l.useState("");
    let f = r.trim().toLowerCase();
    let N = people.filter((e)=>!f || `${e.firstName} ${e.lastName} ${e.email}`.toLowerCase().includes(f));
    function j(a) {
        a();
        setU(t("admin.people.updated"));
    }
    return <n.i><div className="space-y-4"><h1 className="font-display text-3xl">{t("admin.people.title")}</h1><form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e)=>{
        e.preventDefault();
        setR(d);
    }}><input value={d} onChange={(e)=>setD(e.target.value)} placeholder={t("admin.people.search")} aria-label={t("admin.people.searchLabel")} className="app-input sm:min-w-0 sm:flex-1"/><button type="submit" className="app-btn-ghost w-full sm:w-auto">{t("admin.people.find")}</button></form>{u && <p role="status" className="text-sm text-mist">{u}</p>}{ready && N.length === 0 && <section className="app-card p-6 text-center"><h2 className="font-display text-xl">{f ? t("admin.people.noMatch", {
        q: r
    }) : t("admin.people.emptyTitle")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t("admin.people.emptyBody")}</p></section>}<div className="space-y-3">{N.map((a)=><section key={a.id} className="app-card p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="font-semibold">{a.firstName} {a.lastName}</p><p className="break-all text-sm text-mist">{a.email}</p><p className="mt-1 text-xs text-faint">{t(`admin.role.${a.role}`)} · {t(`admin.status.${a.status}`)} · {t("admin.people.email")} {a.emailVerified ? t("admin.people.confirmed") : t("admin.people.pendingEmail")} · {t("admin.access")} {t(`admin.access.${a.access}`)}{a.isSample ? ` · ${t("admin.sampleShort").toLowerCase()}` : ""}</p></div>{a.role !== "admin" && <div className="flex flex-wrap gap-2"><button type="button" onClick={()=>j(()=>toggleStatus(a.id))} className="app-btn-ghost">{a.status === "suspended" ? t("admin.people.suspended") : t("admin.people.suspend")}</button>{a.access !== "none" && <button type="button" onClick={()=>j(()=>toggleAccess(a.id))} className="app-btn-danger">{a.access === "revoked" ? t("admin.people.return") : t("admin.people.revoke")}</button>}</div>}</div></section>)}</div></div></n.i>;
}
