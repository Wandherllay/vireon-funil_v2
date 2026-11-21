// @ts-nocheck
/* eslint-disable */
import * as l from "./module-773.jsx";
import * as i from "./module-7244.jsx";

import _a from "../shim/link.jsx";
import * as c from "./module-4230.jsx";
import * as o from "./module-3677.jsx";
export function SecretLessonClient({ id }) {
    let { t: t_1, lang } = o.s9();
    let d = c.e$.findIndex((e)=>e.lessons.some((e)=>e.id === id));
    let h = d === -1 ? null : c.e$[d].lessons.find((e)=>e.id === id);
    return <l.GV current="/start/trick"><l.wc/><i.v/><div className="space-y-4">{h && d !== -1 ? <><_a href="/start/trick/secrets" className="text-sm text-cyan">{t_1("trick.secrets.title")}</_a><div><p className="text-xs uppercase tracking-wide text-faint">{t_1("trick.secrets.module")} {d + 1} · {c.e$[d].title[lang]}</p><h1 className="mt-1 font-display text-3xl">{h.title[lang]}</h1></div>{h.youtube ? <iframe key={h.youtube} className="aspect-video w-full rounded-[22px] bg-black" src={`https://www.youtube-nocookie.com/embed/${h.youtube}?rel=0&modestbranding=1&playsinline=1`} title={h.title[lang]} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/> : <video key={h.url} className="aspect-video w-full rounded-[22px] bg-black" controls playsInline preload="metadata" src={h.url}>{t_1("trick.secrets.videoUnsupported")}</video>}{h.youtube && <a href={`https://www.youtube.com/watch?v=${h.youtube}`} target="_blank" rel="noopener noreferrer" className="inline-flex text-sm font-semibold text-cyan">{t_1("trick.secrets.openYoutube")} ↗</a>}<aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside></> : <><h1 className="font-display text-3xl">{t_1("trick.secrets.notFound")}</h1><_a href="/start/trick/secrets" className="inline-flex text-sm font-semibold text-cyan">{t_1("trick.secrets.back")}</_a></>}</div></l.GV>;
}
