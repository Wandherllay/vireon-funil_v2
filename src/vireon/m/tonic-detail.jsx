// @ts-nocheck
/* eslint-disable */
import * as a from "./module-773.jsx";
import * as i from "./module-7244.jsx";
import { IG, Op } from "./module-4666.jsx";
import _t from "../shim/link.jsx";
import * as n from "./module-4230.jsx";
import * as c from "./module-3677.jsx";
import { tonicDetails } from "../content/tonics.js";

function List({ title, items, ordered, warn }) {
    if (!items || items.length === 0) {
        return null;
    }
    let Tag = ordered ? "ol" : "ul";
    return <section className={`app-card p-5 ${warn ? "border-warn/30" : ""}`}><h2 className="font-display text-xl">{title}</h2><Tag className={`mt-3 ${ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5 text-sm leading-6 text-mist`}>{items.map((e, k)=><li key={k}>{e}</li>)}</Tag></section>;
}

export function TonicDetailClient({ id }) {
    let { t: t_1, lang } = c.s9();
    let { email } = IG();
    let r = n.Tk.find((e)=>e.slug === id);
    let d = tonicDetails.find((e)=>e.slug === id);
    if (!r) {
        return <a.GV current="/start/trick"><i.v/><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("trick.tonic.notFound")}</h1><_t href={Op("/start/trick/tonic", email)} className="inline-flex text-sm font-semibold text-cyan">{t_1("trick.tonic.back")}</_t></div></a.GV>;
    }
    let L = (v)=>v ? (v[lang] ?? v.en) : null;
    return <a.GV current="/start/trick"><a.wc/><i.v/><article className="space-y-4"><_t href={Op("/start/trick/tonic", email)} className="text-sm text-cyan">{t_1("trick.tonic.back")}</_t><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-cyan">{t_1(`tag.${r.tag}`)} · {t_1(`tag.${r.level}`)}</p><h1 className="mt-1 font-display text-3xl">{r.title[lang]}</h1><p className="mt-2 text-sm leading-6 text-mist">{d ? L(d.intro) : r.text[lang]}</p></div><section className="app-card grid grid-cols-2 gap-3 p-4 text-sm"><div><p className="text-faint">{t_1("trick.tonic.prep")}</p><p className="font-semibold">{r.minutes} {t_1("trick.recipes.min")}</p></div><div><p className="text-faint">{t_1("trick.tonic.window")}</p><p className="font-semibold">{r.window}{/h/.test(r.window) ? "" : ` ${t_1("trick.recipes.min")}`}</p></div></section>{d && <><List title={t_1("trick.tonic.ingredients")} items={L(d.ingredients)}/><List title={t_1("trick.tonic.preparation")} items={L(d.preparation)} ordered/><List title={t_1("trick.tonic.howToUse")} items={L(d.howToUse)}/><List title={t_1("trick.tonic.cautions")} items={L(d.cautions)} warn/></>}<aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside></article></a.GV>;
}
