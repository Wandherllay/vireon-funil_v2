// @ts-nocheck
/* eslint-disable */

import _c from "../shim/link.jsx";
import * as r from "react";
import * as a from "./module-773.jsx";
import * as n from "./module-7244.jsx";
import * as d from "./module-2800.jsx";
import * as o from "./module-3677.jsx";
export function RecipesClient() {
    let { t: t_1, lang } = o.s9();
    let [s, setS] = r.useState("all");
    let [x, setX] = r.useState("");
    let p = r.useMemo(()=>{
        let e = x.trim().toLowerCase();
        return d.IF.filter((t)=>(s === "all" || t.category === s) && (!e || `${t.title} ${t.description}`.toLowerCase().includes(e)));
    }, [
        s,
        x
    ]);
    return <a.GV current="/start/trick"><a.wc/><n.v/><div className="space-y-4"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{t_1("trick.recipes.tag")}</p><h1 className="mt-1 font-display text-3xl">{t_1("trick.recipes.title")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t_1("trick.recipes.sub")}</p></div><input value={x} onChange={(e)=>setX(e.target.value)} placeholder={t_1("trick.recipes.search")} aria-label={t_1("trick.recipes.search")} className="min-h-11 w-full max-w-full rounded-2xl border border-white/10 bg-ink-950 px-3 text-base text-foam outline-none placeholder:text-faint"/><div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1"><button type="button" onClick={()=>setS("all")} className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm font-semibold ${s === "all" ? "bg-accent text-white" : "bg-white/5 text-mist"}`}>{t_1("discover.all")}</button>{d.sl.map((e)=><button key={e.id} type="button" onClick={()=>setS(e.id)} className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm font-semibold ${s === e.id ? "bg-accent text-white" : "bg-white/5 text-mist"}`}>{e.label[lang]}</button>)}</div><div className="grid gap-3 sm:grid-cols-2">{p.map((e)=><_c key={e.id} href={`/start/trick/recipes/${e.id}`} data-discover="true"><section className="h-full rounded-[22px] border border-white/10 bg-ink-800/90 p-4 shadow-card"><p className="text-xs uppercase tracking-wide text-faint">{d.Jm(e.category, lang)} · {e.prepTime}</p><h2 className="mt-1 font-semibold">{e.title}</h2><p className="mt-1 line-clamp-2 text-sm text-mist">{e.description}</p></section></_c>)}</div>{p.length === 0 && <section className="rounded-[22px] border border-white/10 bg-ink-800/90 p-6 text-center shadow-card"><h2 className="font-display text-xl">{t_1("trick.recipes.empty")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t_1("trick.recipes.emptyHint")}</p></section>}</div></a.GV>;
}
