// @ts-nocheck
/* eslint-disable */
import * as a from "./module-773.jsx";
import * as i from "./module-7244.jsx";

import * as n from "./module-4230.jsx";
import * as c from "./module-3677.jsx";
export function TonicClient() {
    let { t: t_1, lang } = c.s9();
    return <a.GV current="/start/trick"><a.wc/><i.v/><div className="space-y-4"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{t_1("trick.tonic.tag")}</p><div><h1 className="font-display text-3xl">{t_1("trick.tonic.title")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t_1("trick.tonic.sub")}</p></div>{n.Tk.map((r, key)=><section key={key} className="app-card p-5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan">{t_1(`tag.${r.tag}`)} · {t_1(`tag.${r.level}`)} · {r.minutes} {t_1("trick.recipes.min")}</p><h2 className="mt-1.5 font-display text-lg">{r.title[lang]}</h2><p className="mt-1.5 text-sm leading-6 text-mist">{r.text[lang]}</p><p className="mt-3 text-xs text-faint">{t_1("trick.tonic.window")}: {r.window} {t_1("trick.recipes.min")}</p></section>)}<section className="app-card space-y-2 p-5 text-xs leading-6 text-faint"><p>{t_1("legal.short")}</p><p>{t_1("legal.emergency")}</p></section></div></a.GV>;
}
