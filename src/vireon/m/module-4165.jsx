// @ts-nocheck
/* eslint-disable */

import _l from "../shim/link.jsx";
import * as a from "./module-773.jsx";
import * as i from "./module-7244.jsx";
import * as r from "./module-4230.jsx";
import * as o from "./module-5002.jsx";
import * as d from "./module-3677.jsx";
export function LessonClient({ courseSlug, lessonSlug }) {
    let { t: t_1, lang } = d.s9();
    let m = r.Xt.find((s)=>s.slug === courseSlug);
    let h = o.it(courseSlug, lessonSlug);
    return <a.GV current="/start/trick"><a.wc/><i.v/><div className="space-y-4">{m && h ? <><_l href={`/start/trick/lessons/${courseSlug}`} className="text-sm text-cyan">{m.title[lang]}</_l><div><p className="text-xs uppercase tracking-wide text-faint">{t_1("trick.lessons.lesson")} {h.index + 1}</p><h1 className="mt-1 font-display text-3xl">{h.lesson.title[lang]}</h1></div><section className="space-y-3 rounded-[22px] border border-white/10 bg-ink-800/90 p-5 shadow-card">{h.lesson.body[lang].map((s, key)=><p key={key} className="text-sm leading-6 text-mist">{s}</p>)}</section>{h.course.lessons[h.index + 1] && <_l href={`/start/trick/lessons/${courseSlug}/${h.course.lessons[h.index + 1].slug}`} className="inline-flex text-sm font-semibold text-cyan">{`${t_1("trick.lessons.next")}: ${h.course.lessons[h.index + 1].title[lang]}`}</_l>}<aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside></> : <><h1 className="font-display text-3xl">{t_1("trick.lessons.lessonNotFound")}</h1><_l href="/start/trick/lessons" className="inline-flex text-sm font-semibold text-cyan">{t_1("trick.lessons.backToCourse")}</_l></>}</div></a.GV>;
}
