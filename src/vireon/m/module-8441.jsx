// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";
import { p } from "./module-9571.jsx";

import _s from "../shim/link.jsx";
import * as l from "react";
import * as c from "./module-3677.jsx";
import * as o from "./module-5751.jsx";
let h = "vireon.member.program";
export function ProgramClient({ slug }) {
    let { email } = IG();
    let { t: t_1, lang } = c.s9();
    let x = p();
    let [u, setU] = l.useState(false);
    l.useEffect(()=>{
        setU(window.localStorage.getItem(h) === slug);
    }, [
        slug
    ]);
    let f = o.Kp(slug);
    if (!f) {
        return null;
    }
    let length = x.completedDays.filter((e)=>e.startsWith(`${slug}:`)).length;
    let percent = Math.round(length / f.totalDays * 100);
    let w = Math.min(length + 1, f.totalDays);
    return <i.GV current="/start/programs"><i.wc/><div className="space-y-4"><_s href={Op("/start/programs", email)} className="text-sm text-cyan">{t_1("programs.all")}</_s><h1 className="font-display text-3xl">{t_1(`programs.${slug === "7-day-starter" ? 1 : 2}.title`)}</h1><p className="text-sm leading-6 text-mist">{t_1(`programs.${slug === "7-day-starter" ? 1 : 2}.text`)}</p><aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.pending")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside>{u ? <p className="text-sm text-ok">{t_1("programs.percentDone", {
        percent
    })}</p> : <button type="button" onClick={function() {
        window.localStorage.setItem(h, slug);
        setU(true);
    }} className="app-btn w-auto">{t_1("programs.start")}</button>}{f.weeks.map((e)=><section key={e.week}>{e.title && <h2 className="mb-2 mt-4 font-display text-lg">{t_1("programs.week", {
            n: e.week,
            title: e.title
        })}</h2>}<div className="space-y-2">{e.days.map((e)=>{
            let l = x.completedDays.includes(`${slug}:${e.dayNumber}`);
            let i = u && !l && e.dayNumber > w;
            let c = u && !l && e.dayNumber === w;
            let o = <section className="app-card flex items-center justify-between gap-3 p-4"><div className="min-w-0"><p className="text-xs text-faint">{t_1("programs.day")} {e.dayNumber}</p><h3 className="font-semibold">{e.title[lang]}</h3></div><span className={`shrink-0 text-sm ${l ? "text-ok" : c ? "text-cyan" : "text-faint"}`}>{l ? t_1("programs.complete") : i ? t_1("programs.locked") : c ? t_1("programs.current") : t_1("programs.openDay")}</span></section>;
            if (!u || i) {
                return <div key={e.dayNumber}>{o}</div>;
            }
            return <_s key={e.dayNumber} href={Op(`/start/programs/${slug}/days/${e.dayNumber}`, email)}>{o}</_s>;
        })}</div></section>)}</div></i.GV>;
}
