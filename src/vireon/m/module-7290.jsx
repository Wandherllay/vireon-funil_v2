// @ts-nocheck
/* eslint-disable */

import _n from "../shim/link.jsx";
import * as i from "./module-773.jsx";
import * as r from "./module-7244.jsx";
import * as a from "./module-4230.jsx";
import * as d from "./module-5002.jsx";
import * as x from "./module-3677.jsx";
export function CourseClient({ slug }) {
    let { t, lang } = x.s9();
    let o = a.Xt.find((s)=>s.slug === slug);
    let h = d.Fb(slug);
    return <i.GV current="/start/trick"><i.wc/><r.v/><div className="space-y-4">{o && h ? <><_n href="/start/trick/lessons" className="text-sm text-cyan">{t("trick.lessons.title")}</_n><div><h1 className="font-display text-3xl">{o.title[lang]}</h1><p className="mt-2 text-sm leading-6 text-mist">{o.text[lang]}</p></div><ol className="space-y-2">{h.lessons.map((s, e)=><li key={s.slug}><_n href={`/start/trick/lessons/${h.slug}/${s.slug}`}><section className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-sm font-semibold text-cyan">{e + 1}</span><span className="min-w-0"><span className="block font-semibold">{s.title[lang]}</span><span className="mt-1 block text-xs text-faint">{s.outline ? t("trick.lessons.outlineTag") : t("trick.lessons.written")}</span></span></section></_n></li>)}</ol></> : <><h1 className="font-display text-3xl">{t("trick.lessons.notFound")}</h1><_n href="/start/trick/lessons" className="inline-flex text-sm font-semibold text-cyan">{t("trick.lessons.backToCourse")}</_n></>}</div></i.GV>;
}
