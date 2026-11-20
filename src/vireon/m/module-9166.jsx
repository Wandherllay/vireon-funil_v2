// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import * as l from "./module-7244.jsx";

import _a from "../shim/link.jsx";
import * as c from "./module-4230.jsx";
import * as o from "./module-3677.jsx";
export function SecretsClient() {
    let { t: t_1, lang } = o.s9();
    return <i.GV current="/start/trick"><i.wc/><l.v/><div className="space-y-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t_1("trick.secrets.tag")}</p><h1 className="mt-1 font-display text-3xl">{t_1("trick.secrets.title")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t_1("trick.secrets.sub")}</p></div>{c.e$.map((s, a)=><section key={s.id} className="space-y-2"><h2 className="font-display text-xl">{t_1("trick.secrets.module")} {a + 1} · {s.title[lang]}</h2>{s.lessons.map((e, s)=><_a key={e.id} href={`/start/trick/secrets/${e.id}`} data-discover="true"><section className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-sm font-semibold text-cyan">{s + 1}</span><span className="font-semibold">{e.title[lang]}</span></section></_a>)}</section>)}<aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside></div></i.GV>;
}
