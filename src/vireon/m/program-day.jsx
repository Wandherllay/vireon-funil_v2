// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";
import { p } from "./module-9571.jsx";

import _s from "../shim/link.jsx";
import * as c from "./module-3677.jsx";
import * as o from "./module-5751.jsx";

function pick(v, lang) {
    if (v == null) {
        return v;
    }
    if (typeof v === "string" || Array.isArray(v)) {
        return v;
    }
    return v[lang] ?? v.en;
}

export function ProgramDayClient({ slug, day }) {
    let { email } = IG();
    let { t: t_1, lang } = c.s9();
    let x = p();
    let dayNumber = Number(day);
    let found = o.GK(slug, dayNumber);
    let programTitle = t_1(`programs.${slug === "7-day-starter" ? 1 : 2}.title`);
    if (!found) {
        return <i.GV current="/start/programs"><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("programs.dayNotFound")}</h1><_s href={Op("/start/programs", email)} className="inline-flex text-sm font-semibold text-cyan">{t_1("programs.all")}</_s></div></i.GV>;
    }
    let { program, day: d } = found;
    let g = d.guide;
    let intro = g ? pick(g.intro, lang) : d.introduction;
    let guidance = g ? pick(g.guidance, lang) : d.article.split("\n\n");
    let steps = g ? pick(g.steps, lang) : [];
    let activityTitle = g ? pick(g.activity.title, lang) : d.activityTitle;
    let activityBody = g ? pick(g.activity.body, lang) : d.activityBody;
    let tasks = g ? pick(g.tasks, lang) : d.tasks;
    let tip = g ? pick(g.tip, lang) : null;
    let key = `${slug}:${dayNumber}`;
    let done = x.completedDays.includes(key);
    let hasPrev = dayNumber > 1;
    let hasNext = dayNumber < program.totalDays;
    return <i.GV current="/start/programs"><i.wc/><article className="space-y-4"><_s href={Op(`/start/programs/${slug}`, email)} className="text-sm text-cyan">{t_1("programs.backTo", {
        title: programTitle
    })}</_s><div><p className="text-xs uppercase tracking-wide text-faint">{t_1("programs.dayTitle")} {dayNumber}</p><h1 className="mt-1 font-display text-3xl">{d.title[lang] ?? d.title.en}</h1>{intro && <p className="mt-2 text-sm leading-6 text-mist">{intro}</p>}</div><section className="app-card p-5 text-sm leading-6 text-mist"><h2 className="font-display text-xl text-foam">{t_1("programs.guideTitle")}</h2>{guidance.map((e, k)=><p key={k} className="mt-3">{e}</p>)}</section>{steps.length > 0 && <section className="app-card p-5"><h2 className="font-display text-xl">{t_1("programs.stepsTitle")}</h2><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-mist">{steps.map((e, k)=><li key={k}>{e}</li>)}</ol></section>}<section className="app-card p-5"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{t_1("programs.activityTitle")}</p><h2 className="mt-1 font-display text-xl">{activityTitle}</h2><p className="mt-2 text-sm leading-6 text-mist">{activityBody}</p></section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("programs.checklist")}</h2><ul className="mt-3 space-y-2">{tasks.map((e, k)=>{
        let taskKey = `${key}:${k}`;
        let checked = taskKey in x.tasks;
        return <li key={taskKey}><button type="button" onClick={()=>x.toggleTask(taskKey, e)} aria-pressed={checked} className="flex w-full items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 text-left text-sm"><span className={checked ? "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok text-ink-950" : "h-5 w-5 shrink-0 rounded-full border border-white/20"} aria-hidden="true">{checked ? "✓" : ""}</span><span className={checked ? "text-mist line-through" : ""}>{e}</span></button></li>;
    })}</ul></section>{tip && <aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("programs.tipTitle")}</p><p className="mt-1">{tip}</p></aside>}{done ? <p className="text-sm font-semibold text-ok">{t_1("programs.completed")}</p> : <button type="button" onClick={()=>x.completeDay(key, `${programTitle} · ${t_1("programs.dayTitle")} ${dayNumber}`)} className="app-btn w-auto">{t_1("programs.markComplete")}</button>}<nav className="flex items-center justify-between gap-3 text-sm font-semibold">{hasPrev ? <_s href={Op(`/start/programs/${slug}/days/${dayNumber - 1}`, email)} className="text-cyan">← {t_1("programs.previous")}</_s> : <span/>}{hasNext ? <_s href={Op(`/start/programs/${slug}/days/${dayNumber + 1}`, email)} className="text-cyan">{t_1("programs.next")} →</_s> : <span/>}</nav><aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside></article></i.GV>;
}
