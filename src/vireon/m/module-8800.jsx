// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import * as l from "./module-7244.jsx";

import * as r from "react";
import * as n from "./module-3677.jsx";
let c = [
    1,
    2,
    3,
    4,
    5
];
function OComponent({ label }) {
    return <p className="mt-2 flex gap-0.5 text-cyan" aria-label={label}>{Array.from({
        length: 5
    }, (e, key)=><svg key={key} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>)}</p>;
}
export function TrickClient() {
    let { t: t_1, lang } = n.s9();
    let [p, setP] = r.useState("75");
    let [g, setG] = r.useState("35");
    let [j, setJ] = r.useState("beginner");
    let [k, setK] = r.useState({});
    let [v, setV] = r.useState(null);
    let [y, setY] = r.useState(null);
    let C = [
        {
            title: t_1("trick.step.1.title"),
            body: t_1("trick.step.1.body", {
                ml: v?.waterMl ?? 250
            })
        },
        {
            title: t_1("trick.step.2.title"),
            body: t_1("trick.step.2.body", {
                spoon: t_1(v?.spoon ?? "trick.spoon.one"),
                grams: v?.grams ?? 3
            })
        },
        {
            title: t_1("trick.step.3.title"),
            body: t_1("trick.step.3.body", {
                lemon: t_1(v?.lemon ?? "trick.lemon.third")
            })
        },
        {
            title: t_1("trick.step.4.title"),
            body: t_1("trick.step.4.body")
        },
        {
            title: t_1("trick.step.5.title"),
            body: t_1(v?.timing ?? "trick.timing")
        }
    ];
    return <i.GV current="/start/trick"><i.wc/><l.v/><div className="space-y-4"><section className="app-card overflow-hidden bg-[radial-gradient(420px_180px_at_100%_0%,rgba(73,210,255,0.22),transparent_55%),linear-gradient(160deg,#12305f,#07101f)] p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t_1("trick.tag")}</p><h1 className="mt-2 font-display text-3xl leading-tight">{t_1("trick.title")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t_1("trick.sub")}</p><p className="mt-3 text-xs text-faint">{t_1("trick.social")}</p></section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("trick.calc.title")}</h2><form onSubmit={function(e) {
        e.preventDefault();
        let t = ((e, t)=>{
            let s = {};
            let a = Number(e);
            let r = Number(t);
            if (!e.trim() || !Number.isFinite(a) || a < 40 || a > 150) {
                s.weight = "trick.err.weight";
            }
            if (!t.trim() || !Number.isFinite(r) || r < 18 || r > 80) {
                s.age = "trick.err.age";
            }
            return s;
        })(p, g);
        setK(t);
        if (t.weight || t.age) {
            setV(null);
            return;
        }
        setV(((e, t, s)=>{
            let a = e / 10 * 0.5;
            if (t > 60) {
                a *= 0.8;
            } else if (t < 25) {
                a *= 0.9;
            }
            if (s === "beginner") {
                a *= 0.75;
            } else if (s === "intermediate") {
                a *= 0.9;
            }
            let grams = Math.round(10 * a) / 10;
            let i = grams / 4.5;
            return {
                grams,
                waterMl: Math.round(Math.max(250, 100 * grams)),
                lemon: grams > 3 ? "trick.lemon.half" : "trick.lemon.third",
                spoon: i < 0.5 ? "trick.spoon.quarter" : i < 0.75 ? "trick.spoon.half" : i < 1.25 ? "trick.spoon.one" : i < 1.75 ? "trick.spoon.oneHalf" : "trick.spoon.two",
                timing: "trick.timing"
            };
        })(Number(p), Number(g), j));
    }} className="mt-4 space-y-4"><div className="grid gap-3 sm:grid-cols-3"><label className="block"><span className="mb-1.5 block text-sm text-mist">{t_1("trick.weight")}</span><input className="app-input" inputMode="decimal" value={p} aria-invalid={!!k.weight} onChange={(e)=>{
        setP(e.target.value);
        setK({});
        setV(null);
    }}/>{k.weight && <span role="alert" className="mt-1 block text-xs text-danger">{t_1(k.weight)}</span>}</label><label className="block"><span className="mb-1.5 block text-sm text-mist">{t_1("trick.age")}</span><input className="app-input" inputMode="numeric" value={g} aria-invalid={!!k.age} onChange={(e)=>{
        setG(e.target.value);
        setK({});
        setV(null);
    }}/>{k.age && <span role="alert" className="mt-1 block text-xs text-danger">{t_1(k.age)}</span>}</label><label className="block"><span className="mb-1.5 block text-sm text-mist">{t_1("trick.exp")}</span><select className="app-input" value={j} onChange={(e)=>{
        setJ(e.target.value);
        setV(null);
    }}><option value="beginner">{t_1("trick.beginner")}</option><option value="intermediate">{t_1("trick.intermediate")}</option><option value="advanced">{t_1("trick.advanced")}</option></select></label></div><button type="submit" className="app-btn w-full">{t_1("trick.submit")}</button></form>{v && <div role="region" aria-live="polite" aria-label={t_1("trick.result.tag")} className="mt-4 rounded-2xl border border-cyan/20 bg-cyan/5 p-4"><p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-mist">{t_1("trick.result.tag")}</p><div className="mt-3 grid grid-cols-3 gap-2"><div className="rounded-2xl bg-night p-3 text-center"><p className="font-display text-2xl text-cyan">{v.grams} g</p><p className="mt-1 text-xs text-faint">{t_1("trick.result.soda")}</p><p className="text-xs text-cyan">{t_1(v.spoon)}</p></div><div className="rounded-2xl bg-night p-3 text-center"><p className="font-display text-2xl">{v.waterMl} ml</p><p className="mt-1 text-xs text-faint">{t_1("trick.result.water")}</p><p className="text-xs text-mist">{t_1("trick.result.glass")}</p></div><div className="rounded-2xl bg-night p-3 text-center"><p className="text-2xl" aria-hidden="true">🍋</p><p className="mt-1 text-xs text-faint">{t_1("trick.result.lemon")}</p><p className="text-xs text-mist">{t_1(v.lemon)}</p></div></div><p className="mt-3 text-center text-xs text-mist">{t_1(v.timing)}</p></div>}</section><section className="space-y-2"><h2 className="font-display text-xl">{t_1("trick.steps.title")}</h2>{C.map((e, t)=><section key={e.title} className="app-card flex items-start gap-3 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/10 font-semibold text-cyan">{t + 1}</span><div className="min-w-0"><h3 className="font-semibold">{e.title}</h3><p className="mt-1 text-sm leading-6 text-mist">{e.body}</p></div></section>)}</section><section className="space-y-3"><div><h2 className="font-display text-xl">{t_1("trick.reviews.title")}</h2><p className="mt-1 text-sm text-mist">{t_1("trick.reviews.sub")}</p></div>{n.Cr[lang].map((e)=><section key={e.name} className="app-card p-4"><div className="flex items-center gap-2"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-semibold text-white">{e.name.slice(0, 1)}</span><p className="font-semibold">{e.name}</p><span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-mist">{t_1("trick.days", {
            n: e.days
        })}</span></div><p className="mt-2 text-sm leading-6 text-mist">{e.text}</p><OComponent label={t_1("trick.stars")}/></section>)}<p className="text-center text-sm text-faint">{t_1("trick.reviews.more")}</p></section><section className="space-y-2"><h2 className="font-display text-xl">{t_1("trick.faq.title")}</h2>{c.map((e)=>{
        let t = y === e;
        return <section key={e} className="app-card p-4"><button type="button" onClick={()=>setY(t ? null : e)} aria-expanded={t} className="flex w-full items-center justify-between gap-3 text-left"><span className="font-medium">{t_1(`trick.faq.${e}.q`)}</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${t ? "text-cyan" : "text-faint"}`}>{t ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="m6 9 6 6 6-6"/>}</svg></button>{t && <p className="mt-3 text-sm leading-6 text-mist">{t_1(`trick.faq.${e}.a`)}</p>}</section>;
    })}</section><aside className="rounded-2xl border border-warn/30 bg-warn/10 p-4 text-sm leading-6 text-warn"><p className="font-semibold">{t_1("trick.notice.title")}</p><p className="mt-1">{t_1("trick.notice.text")}</p></aside><aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside></div></i.GV>;
}
