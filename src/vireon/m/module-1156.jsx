// @ts-nocheck
/* eslint-disable */
import * as c from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";
import { p } from "./module-9571.jsx";
import { r } from "./module-4211.jsx";

import _r from "../shim/link.jsx";
import * as n from "react";
import * as i from "./module-4230.jsx";
import * as o from "./module-3677.jsx";
import * as d from "./module-5751.jsx";
let h = [
    {
        key: "movement",
        label: "progress.h1"
    },
    {
        key: "meals",
        label: "progress.h2"
    },
    {
        key: "sleep",
        label: "progress.h3"
    },
    {
        key: "pause",
        label: "progress.h4"
    }
];
let u = (e)=>`${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
export function ProgressClient() {
    let { email } = IG();
    let { t: t_1, lang } = o.s9();
    let { saved } = r();
    let f = p();
    let [j, setJ] = n.useState(null);
    n.useEffect(()=>{
        setJ(window.localStorage.getItem("vireon.member.program"));
    }, []);
    let v = j ? d.Kp(j) : null;
    let done = v ? f.completedDays.filter((e)=>e.startsWith(`${v.slug}:`)).length : 0;
    let y = v ? Math.round(done / v.totalDays * 100) : 0;
    let N = n.useMemo(()=>f.last28.map((e, t)=>({
                day: Number(e.split("-")[2]),
                key: e,
                today: t === 27
            })), [
        f.last28
    ]);
    let k = n.useMemo(()=>{
        let e = new Date;
        let t = {};
        Object.values(f.tasks).forEach((e)=>{
            let a = u(new Date(e.at));
            t[a] = (t[a] ?? 0) + 1;
        });
        return Array.from({
            length: 7
        }, (s, a)=>{
            let c = new Date(e);
            c.setDate(e.getDate() - (6 - a));
            let dayKey = u(c);
            return {
                dayKey,
                weekday: c.toLocaleDateString(lang === "pt" ? "pt-BR" : lang === "es" ? "es" : "en", {
                    weekday: "narrow"
                }),
                count: (f.habits[dayKey] ?? []).length + (t[dayKey] ?? 0)
            };
        });
    }, [
        f.habits,
        f.tasks,
        lang
    ]);
    let S = Object.values(f.habits).reduce((acc, item)=>acc + item.length, 0) + Object.keys(f.tasks).length;
    let D = Math.max(1, ...k.map((e)=>e.count));
    return <c.GV current="/start/progress"><c.wc/><div className="space-y-4"><div><h1 className="font-display text-3xl">{t_1("progress.title")}</h1><p className="mt-1 text-sm leading-6 text-mist">{t_1("progress.sub")}</p></div><section className="app-card flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{v ? t_1("progress.current") : t_1("progress.none")}</p><h2 className="mt-2 font-display text-xl sm:text-2xl">{v ? t_1(`programs.${v.slug === "7-day-starter" ? 1 : 2}.title`) : t_1("progress.choose")}</h2><p className="mt-1 text-sm text-mist">{v ? t_1("progress.ofDays", {
        done,
        total: v.totalDays
    }) : t_1("progress.chooseText")}</p><_r href={Op(v ? `/start/programs/${v.slug}` : "/start/programs", email)} className="mt-3 inline-block text-sm font-semibold text-cyan">{v ? t_1("home.focus.open") : t_1("progress.open")}</_r></div><div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28" aria-label={t_1("progress.ofDays", {
        done,
        total: v?.totalDays ?? 30
    })}><svg viewBox="0 0 120 120" className="h-full w-full -rotate-90"><circle cx="60" cy="60" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none"/><circle cx="60" cy="60" r="42" stroke="#49D2FF" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - y / 100)}/></svg><div className="absolute inset-0 grid place-items-center"><span className="font-display text-2xl font-semibold">{y}%</span></div></div></section><div className="grid gap-3 sm:grid-cols-3"><section className="app-card p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-faint">{t_1("progress.activities")}</p><p className="mt-2 font-display text-3xl">{S}</p></section><section className="app-card p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-faint">{t_1("progress.active")}</p><p className="mt-2 font-display text-3xl">{f.activeDays}</p><p className="text-xs text-faint">{t_1("progress.device")}</p></section><section className="app-card p-4"><p className="text-[11px] font-bold uppercase tracking-wide text-faint">{t_1("progress.completed")}</p><p className="mt-2 font-display text-3xl">{v && done === v.totalDays ? 1 : 0}</p></section></div><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("progress.habits")}</h2><p className="mt-1 text-sm text-mist">{t_1("progress.habitsSub")}</p><ul className="mt-4 space-y-2">{h.map((e)=>{
        let t = f.todayHabits.includes(e.key);
        return <li key={e.key}><button type="button" onClick={()=>f.toggleHabit(e.key, t_1(e.label))} aria-pressed={t} className="flex min-h-12 w-full items-center gap-3 rounded-2xl bg-white/5 px-3 text-left text-sm"><span aria-hidden="true" className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] ${t ? "bg-ok text-ink-950" : "border border-white/20"}`}>{t ? "✓" : ""}</span>{t_1(e.label)}</button></li>;
    })}</ul></section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("progress.week")}</h2><p className="mt-1 text-sm text-mist">{t_1("progress.weekSub")}</p><div className="mt-4 grid grid-cols-7 items-end gap-2" aria-label={t_1("progress.weekly")}>{k.map((e)=><div key={e.dayKey} className="text-center"><div className="flex h-28 items-end justify-center"><div className="w-full max-w-8 rounded-t-lg bg-cyan/80" style={{
            height: `${Math.max(6, e.count / D * 100)}%`
        }}/></div><p className="mt-2 text-[11px] uppercase text-faint">{e.weekday}</p><p className="text-[11px] text-mist">{e.count}</p></div>)}</div></section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("progress.calendar")}</h2><div className="mt-4 grid grid-cols-7 gap-2" aria-label={t_1("progress.calendarActivity")}>{N.map((e)=>{
        let t = f.activeDayKeys.has(e.key);
        return <div key={e.key} title={e.key} className={`grid h-10 place-items-center rounded-xl text-xs ${t ? "bg-ok/20 text-ok" : e.today ? "bg-cyan/15 text-cyan" : "bg-white/5 text-faint"}`}>{e.day}</div>;
    })}</div></section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("progress.reading")}</h2>{f.reads.length > 0 ? <ul className="mt-3 space-y-2 text-sm">{f.reads.map((e)=>{
        let s = i.Rm(e.module, e.slug);
        return <li key={`${e.module}-${e.slug}`}><_r href={Op(`/start/discover/${e.module}/${e.slug}`, email)} className="text-cyan">{s ? s.title[lang] : e.title}</_r></li>;
    })}</ul> : <p className="mt-3 text-sm text-mist">{t_1("progress.readingText")}</p>}</section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("progress.saved")}</h2>{saved.length > 0 ? <ul className="mt-3 space-y-2 text-sm">{saved.map((e)=>{
        let [s, n] = e.split("/");
        let c = i.Rm(s, n);
        if (c) {
            return <li key={e}><_r href={Op(`/start/discover/${s}/${n}`, email)} className="text-cyan">{c.title[lang]}</_r></li>;
        }
        return null;
    })}</ul> : <p className="mt-3 text-sm text-mist">{t_1("progress.savedText")}</p>}</section>{v && done === v.totalDays && <section className="app-card p-5"><h2 className="font-display text-xl">{t_1("progress.completed")}</h2><ul className="mt-3 space-y-1 text-sm text-mist"><li>{t_1(`programs.${v.slug === "7-day-starter" ? 1 : 2}.title`)}</li></ul></section>}{S === 0 && <section className="app-card p-5"><h2 className="font-display text-xl">{t_1("progress.noActivity")}</h2><p className="mt-1 text-sm text-mist">{t_1("progress.noActivityText")}</p></section>}</div></c.GV>;
}
