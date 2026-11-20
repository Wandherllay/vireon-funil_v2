// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import * as c from "./module-7244.jsx";

import _a from "../shim/link.jsx";
import * as l from "react";
import * as o from "./module-4230.jsx";
import * as d from "./module-3677.jsx";
export function LessonsClient() {
    let { t: t_1, lang } = d.s9();
    let [s, setS] = l.useState("");
    let h = l.useMemo(()=>o.Xt.map((e, index)=>({
                ...e,
                index
            })), []);
    let x = l.useMemo(()=>{
        let e = s.trim().toLowerCase();
        if (e) {
            return h.filter((s)=>[
                    s.title[lang],
                    s.text[lang],
                    s.title.en,
                    s.text.en
                ].join(" ").toLowerCase().includes(e));
        }
        return h;
    }, [
        h,
        lang,
        s
    ]);
    return <i.GV current="/start/trick"><i.wc/><c.v/><div className="space-y-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t_1("trick.lessons.tag")}</p><h1 className="mt-1 font-display text-3xl">{t_1("trick.lessons.title")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t_1("trick.lessons.count")}</p></div><input value={s} onChange={(e)=>setS(e.target.value)} placeholder={t_1("trick.lessons.search")} aria-label={t_1("trick.lessons.search")} className="min-h-11 w-full max-w-full rounded-2xl border border-white/10 bg-ink-950 px-3 text-base text-foam outline-none placeholder:text-faint"/><div className="grid gap-3 sm:grid-cols-2">{x.map((s)=><_a key={s.slug} href={`/start/trick/lessons/${s.slug}`} data-discover="true"><section className="h-full rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card"><p className="text-xs uppercase tracking-wide text-faint">{s.featured ? t_1("trick.lessons.featured") : s.index === h.length - 1 ? t_1("trick.lessons.outline") : `${t_1("trick.lessons.course")} ${s.index + 1}`}</p><h2 className="mt-1 font-display text-xl">{s.title[lang]}</h2><p className="mt-2 text-sm leading-6 text-mist">{s.text[lang]}</p><p className="mt-3 text-xs text-cyan">{s.lessons} {t_1("trick.lessons.lessons")}</p></section></_a>)}</div>{x.length === 0 && <div className="rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card"><p className="font-semibold">{t_1("trick.lessons.empty")}</p><p className="mt-1 text-sm text-mist">{t_1("trick.lessons.emptyHint")}</p></div>}</div></i.GV>;
}
