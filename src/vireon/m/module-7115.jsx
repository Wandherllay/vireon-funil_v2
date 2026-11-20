// @ts-nocheck
/* eslint-disable */

import * as i from "react";
import * as n from "./module-7629.jsx";
import * as l from "./module-3677.jsx";
import * as m from "./module-6390.jsx";
export function InvitesClient() {
    let { t, lang } = l.s9();
    let { ready, invites, createInvite, revokeInvite } = m.z8();
    let [p, setP] = i.useState({
        label: "",
        email: "",
        expiresInDays: 14
    });
    let [o, setO] = i.useState(null);
    let [h, setH] = i.useState(false);
    let [v, setV] = i.useState("");
    async function onClick() {
        if (o) {
            try {
                await navigator.clipboard.writeText(o);
                setH(true);
                setTimeout(()=>setH(false), 1800);
            } catch (e) {}
        }
    }
    return <n.i><div className="space-y-4"><h1 className="font-display text-3xl">{t("admin.invites.title")}</h1><p className="text-sm leading-6 text-mist">{t("admin.invites.sub")}</p><section className="app-card p-5"><form className="grid gap-3 md:grid-cols-2" onSubmit={function(s) {
        s.preventDefault();
        setV("");
        try {
            let e = createInvite({
                label: p.label,
                email: p.email,
                expiresInDays: p.expiresInDays
            });
            setO(m.fn(e.token));
            setP({
                label: "",
                email: "",
                expiresInDays: 14
            });
            setH(false);
        } catch (s) {
            setV(t("admin.invites.created"));
        }
    }}><label className="block"><span className="mb-1.5 block text-sm text-mist">{t("admin.invites.name")}</span><input value={p.label} onChange={(e)=>setP({
            ...p,
            label: e.target.value
        })} placeholder={t("admin.invites.namePh")} className="app-input"/></label><label className="block"><span className="mb-1.5 block text-sm text-mist">{t("admin.invites.email")}</span><input type="email" value={p.email} onChange={(e)=>setP({
            ...p,
            email: e.target.value
        })} className="app-input"/><span className="mt-1 block text-xs text-faint">{t("admin.invites.emailHint")}</span></label><label className="block"><span className="mb-1.5 block text-sm text-mist">{t("admin.invites.days")}</span><input type="number" min={1} max={90} value={p.expiresInDays} onChange={(e)=>setP({
            ...p,
            expiresInDays: Number(e.target.value)
        })} className="app-input"/></label><button type="submit" className="app-btn md:col-span-2 md:justify-self-end md:w-auto">{t("admin.invites.create")}</button></form>{v && <p role="alert" className="mt-3 text-sm text-danger">{v}</p>}</section>{o && <section className="app-card p-5" role="dialog" aria-label={t("admin.invites.copyTitle")}><div className="flex items-start justify-between gap-3"><h2 className="font-display text-xl">{t("admin.invites.copyTitle")}</h2><button type="button" onClick={()=>setO(null)} className="text-sm text-mist hover:text-white">{t("admin.invites.close")}</button></div><p className="mt-2 text-sm leading-6 text-mist">{t("admin.invites.copyBody")}</p><p className="mt-3 break-all rounded-2xl bg-night px-3 py-2 text-sm text-cyan">{o}</p><button type="button" onClick={onClick} className="app-btn mt-4 w-auto">{h ? t("admin.invites.copied") : t("admin.invites.copy")}</button></section>}<div className="space-y-3">{ready && invites.map((a)=><section key={a.id} className="app-card p-4 text-sm"><p className="font-semibold">{a.label} · {t(`admin.istatus.${a.status}`)}</p><p className="text-mist">{t("admin.invites.final")} {a.hint}{a.isSample ? ` · ${t("admin.sampleShort").toLowerCase()}` : ""}</p><p className="text-faint">{t("admin.invites.expires", {
            date: new Date(a.expiresAt).toLocaleString(l.ne[lang])
        })}{a.intendedEmail ? ` · ${a.intendedEmail}` : ""}{a.usedByEmail ? ` · ${t("admin.invites.used", {
            email: a.usedByEmail
        })}` : ""}</p>{a.status === "active" && <button type="button" onClick={()=>{
            var s;
            s = a.id;
            window.confirm(t("admin.invites.revokeConfirm")) && revokeInvite(s);
        }} className="app-btn-danger mt-3">{t("admin.invites.revoke")}</button>}</section>)}{ready && invites.length === 0 && <p className="app-card p-5 text-sm text-mist">{t("admin.invites.empty")}</p>}</div></div></n.i>;
}
