// @ts-nocheck
/* eslint-disable */
import * as n from "./module-773.jsx";
import { IG, NC } from "./module-4666.jsx";

import * as r from "react";
import * as l from "./module-3677.jsx";
let c = [
    {
        id: "programReminders",
        label: "settings.reminders"
    },
    {
        id: "contentUpdates",
        label: "settings.updates"
    },
    {
        id: "productNews",
        label: "settings.news"
    }
];
let className = "min-h-11 w-full max-w-full rounded-2xl border border-white/10 bg-ink-950 px-3 text-base text-foam outline-none placeholder:text-faint";
function DComponent({ label: label_1, children }) {
    return <label className="block"><span className="mb-1.5 block text-sm text-mist">{label_1}</span>{children}</label>;
}
export function SettingsClient() {
    let { email, name, ready } = IG();
    let { save } = NC();
    let { t: t_1 } = l.s9();
    let [x, setX] = r.useState("");
    let [u, setU] = r.useState("");
    let [g, setG] = r.useState({
        programReminders: true,
        contentUpdates: true,
        productNews: false
    });
    let [j, setJ] = r.useState("");
    let [w, setW] = r.useState("");
    r.useEffect(()=>{
        if (!ready) {
            return;
        }
        let a = name.split(" ");
        setX(a[0] ?? "");
        setU(a.slice(1).join(" "));
        try {
            let e = window.localStorage.getItem("vireon.member.prefs");
            if (e) {
                setG({
                    programReminders: false,
                    contentUpdates: false,
                    productNews: false,
                    ...JSON.parse(e)
                });
            }
        } catch (e) {}
    }, [
        ready,
        name
    ]);
    return <n.GV current="/start/profile"><n.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("settings.title")}</h1>{j && <p role="status" className="text-sm text-ok">{j}</p>}{w && <section role="alert" className="app-card p-5"><p className="text-sm leading-6 text-mist">{w}</p></section>}<section className="app-card p-5"><form className="space-y-4" onSubmit={function(e) {
        e.preventDefault();
        setW("");
        save(`${x} ${u}`.trim());
        try {
            window.localStorage.setItem("vireon.member.prefs", JSON.stringify(g));
        } catch (e) {}
        setJ(t_1("settings.saved"));
    }}><DComponent label={t_1("settings.first")}><input className={className} value={x} onChange={(e)=>setX(e.target.value)} required/></DComponent><DComponent label={t_1("settings.last")}><input className={className} value={u} onChange={(e)=>setU(e.target.value)} required/></DComponent><fieldset className="space-y-2"><legend className="text-sm text-mist">{t_1("settings.prefs")}</legend>{c.map((e)=>{
        var t;
        return <label key={e.id} className="flex items-center gap-3 text-sm"><input type="checkbox" checked={(t = g[e.id]) !== null && t !== undefined && t} onChange={(t)=>setG({
                ...g,
                [e.id]: t.target.checked
            })}/>{t_1(e.label)}</label>;
    })}</fieldset><button type="submit" className="app-btn w-auto">{t_1("settings.save")}</button></form></section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("settings.data")}</h2><p className="mt-2 text-sm leading-6 text-mist">{t_1("settings.dataText")}</p><button type="button" onClick={function() {
        let t = (e, t)=>{
            try {
                let s = window.localStorage.getItem(e);
                if (s) {
                    return JSON.parse(s);
                }
                return t;
            } catch (e) {
                return t;
            }
        };
        let s = new Blob([
            JSON.stringify({
                user: {
                    email,
                    firstName: x,
                    lastName: u,
                    notificationPrefs: g
                },
                exportedAt: new Date().toISOString(),
                progress: {
                    habits: t("vireon.member.habits", {}),
                    tasks: t("vireon.member.tasks", {}),
                    saved: t("vireon.member.saved", []),
                    completedDays: t("vireon.member.days", {}),
                    recent: t("vireon.member.recent", [])
                }
            }, null, 2)
        ], {
            type: "application/json"
        });
        let a = URL.createObjectURL(s);
        let r = document.createElement("a");
        r.href = a;
        r.download = "vireon-max-export.json";
        r.click();
        URL.revokeObjectURL(a);
    }} className="app-btn-ghost mt-4">{t_1("settings.download")}</button></section></div></n.GV>;
}
