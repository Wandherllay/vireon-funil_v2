// @ts-nocheck
/* eslint-disable */
import * as n from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";

import _r from "../shim/link.jsx";
import * as i from "react";
import * as c from "./module-4230.jsx";
import * as o from "./module-3677.jsx";
import { DiscoverArt, hasDiscoverArt } from "./discover-art.jsx";
let m = {
    salmon: "/v2/media/salmon.jpg",
    beans: "/v2/media/bowl.jpg",
    tomatoes: "/v2/media/bowl.jpg",
    avocado: "/v2/media/salmon.jpg",
    spinach: "/v2/media/produce.jpg",
    oranges: "/v2/media/produce.jpg",
    walnuts: "/v2/media/produce.jpg",
    blueberries: "/v2/media/produce.jpg",
    oats: "/v2/media/oatmeal.jpg",
    "berry-oat-bowl": "/v2/media/oatmeal.jpg",
    "veggie-scramble": "/v2/media/produce.jpg",
    "chickpea-bowl": "/v2/media/bowl.jpg",
    "chicken-grain-bowl": "/v2/media/bowl.jpg",
    "salmon-plate": "/v2/media/salmon.jpg",
    "lentil-soup": "/v2/media/bowl.jpg",
    "yogurt-cup": "/v2/media/oatmeal.jpg",
    "apple-walnut-snack": "/v2/media/produce.jpg",
    "brisk-walk": "/v2/media/plank.jpg",
    "sit-to-stand": "/v2/media/plank.jpg",
    "wall-pushup": "/v2/media/plank.jpg",
    "pelvic-floor-awareness": "/v2/media/glow.jpg",
    diaphragmaticBreathing: "/v2/media/glow.jpg",
    "diaphragmatic-breathing": "/v2/media/glow.jpg",
    "mind-wellbeing": "/v2/media/glow.jpg",
    "mental-wellbeing": "/v2/media/glow.jpg",
    "stress-management": "/v2/media/glow.jpg",
    "relaxation-techniques": "/v2/media/glow.jpg",
    "breathing-exercises": "/v2/media/glow.jpg",
    "sleep-fundamentals": "/v2/media/glow.jpg",
    "nighttime-routines": "/v2/media/glow.jpg",
    "sleep-environment": "/v2/media/glow.jpg",
    "recovery-habits": "/v2/media/glow.jpg",
    "consistent-schedules": "/v2/media/glow.jpg"
};
export function CategoryClient({ category }) {
    let { email } = IG();
    let { t: t_1, lang } = o.s9();
    let [h, setH] = i.useState("all");
    let [g, setG] = i.useState("");
    let j = c.R6.find((e)=>e.slug === category);
    if (!j) {
        return null;
    }
    let f = g.trim().toLowerCase();
    let b = i.useMemo(()=>j.items.filter((e)=>(h === "all" || e.tag === h) && (!f || `${e.title[lang]} ${e.text[lang]}`.toLowerCase().includes(f))), [
        j.items,
        h,
        f,
        lang
    ]);
    return <n.GV current="/start/discover"><n.wc/><div className="space-y-4"><_r href={Op("/start/discover", email)} className="text-sm text-cyan">{t_1("discover.back")}</_r><h1 className="font-display text-3xl">{t_1(j.titleKey)}</h1><input value={g} onChange={(e)=>setG(e.target.value)} placeholder={t_1("discover.searchShort")} aria-label={t_1("discover.searchIn", {
        title: t_1(j.titleKey)
    })} className="app-input"/><div className="flex max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-1">{j.tags.map((e)=>{
        let a = h === e;
        return <button key={e} type="button" onClick={()=>setH(e)} aria-pressed={a} className={`shrink-0 rounded-full px-3 py-2 text-sm ${a ? "bg-accent text-white" : "border border-white/10 text-mist"}`}>{e === "all" ? t_1("discover.all") : t_1(`tag.${e}`)}</button>;
    })}</div>{b.length === 0 ? <section className="app-card p-6 text-center"><h2 className="font-display text-xl">{t_1("discover.nothingPublished")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t_1("discover.nothingPublishedText")}</p></section> : <div className="grid gap-3 sm:grid-cols-2">{b.map((e)=>{
        let src = m[e.slug];
        return <_r key={e.slug} href={Op(`/start/discover/${j.slug}/${e.slug}`, email)} data-discover="true"><section className="app-card h-full overflow-hidden transition hover:border-cyan/40">{hasDiscoverArt(j.slug, e.slug) ? <DiscoverArt category={j.slug} slug={e.slug} label={e.title[lang]}/> : src ? <img alt={e.title[lang]} src={src} className="h-36 w-full object-cover"/> : <div aria-hidden="true" className="grid h-36 place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(73,210,255,0.35),transparent_40%),linear-gradient(160deg,#12305f,#07101f)] font-display text-2xl text-cyan">{e.title[lang].charAt(0).toUpperCase()}</div>}<div className="p-4"><p className="text-xs uppercase tracking-wide text-faint">{t_1(`tag.${e.tag}`)}</p><h2 className="mt-1 font-semibold">{e.title[lang]}</h2><p className="mt-1 line-clamp-2 text-sm text-mist">{e.text[lang]}</p></div></section></_r>;
    })}</div>}</div></n.GV>;
}
