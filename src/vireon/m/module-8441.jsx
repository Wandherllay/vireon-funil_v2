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
    return <i.GV current="/start/programs"><i.wc/><div className="space-y-4"><_s href={Op("/start/programs", email)} className="text-sm text-cyan">{t_1("programs.all")}</_s><h1 className="font-display text-3xl">{t_1(`programs.${slug === "7-day-starter" ? 1 : 2}.title`)}</h1><p className="text-sm leading-6 text-mist">{t_1(`programs.${slug === "7-day-starter" ? 1 : 2}.text`)}</p><aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.pending")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside>{u ? <p className="text-sm text-ok">{t_1("programs.enrolled")}</p> : <button type="button" onClick={function() {
        window.localStorage.setItem(h, slug);
        setU(true);
    }} className="app-btn w-auto">{t_1("programs.start")}</button>}{f.weeks.map((e)=><section key={e.week}>{e.title && <h2 className="mb-2 mt-4 font-display text-lg">{e.title[lang] ?? e.title.en}</h2>}<div className="space-y-2">{e.days.map((e)=>{
            let done = x.completedDays.includes(`${slug}:${e.dayNumber}`);
            return <_s key={e.dayNumber} href={Op(`/start/programs/${slug}/days/${e.dayNumber}`, email)}><section className="app-card flex items-center justify-between gap-3 p-4 transition hover:border-cyan/40"><div className="min-w-0"><p className="text-xs text-faint">{t_1("programs.day")} {e.dayNumber}</p><h3 className="font-semibold">{e.title[lang]}</h3></div><span className={`shrink-0 text-sm ${done ? "text-ok" : "text-cyan"}`}>{done ? t_1("programs.complete") : t_1("programs.openDay")}</span></section></_s>;
        })}</div></section>)}</div></i.GV>;
}