// @ts-nocheck
/* eslint-disable */
import * as n from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";

import _r from "../shim/link.jsx";
import * as i from "react";
import * as c from "./module-4230.jsx";
import * as o from "./module-3677.jsx";
let m = {
    salmon: "/media/salmon.jpg",
    beans: "/media/bowl.jpg",
    tomatoes: "/media/bowl.jpg",
    avocado: "/media/salmon.jpg",
    spinach: "/media/produce.jpg",
    oranges: "/media/produce.jpg",
    walnuts: "/media/produce.jpg",
    blueberries: "/media/produce.jpg",
    oats: "/media/oatmeal.jpg",
    "berry-oat-bowl": "/media/oatmeal.jpg",
    "veggie-scramble": "/media/produce.jpg",
    "chickpea-bowl": "/media/bowl.jpg",
    "chicken-grain-bowl": "/media/bowl.jpg",
    "salmon-plate": "/media/salmon.jpg",
    "lentil-soup": "/media/bowl.jpg",
    "yogurt-cup": "/media/oatmeal.jpg",
    "apple-walnut-snack": "/media/produce.jpg",
    "brisk-walk": "/media/plank.jpg",
    "sit-to-stand": "/media/plank.jpg",
    "wall-pushup": "/media/plank.jpg",
    "pelvic-floor-awareness": "/media/glow.jpg",
    diaphragmaticBreathing: "/media/glow.jpg",
    "diaphragmatic-breathing": "/media/glow.jpg",
    "mind-wellbeing": "/media/glow.jpg",
    "mental-wellbeing": "/media/glow.jpg",
    "stress-management": "/media/glow.jpg",
    "relaxation-techniques": "/media/glow.jpg",
    "breathing-exercises": "/media/glow.jpg",
    "sleep-fundamentals": "/media/glow.jpg",
    "nighttime-routines": "/media/glow.jpg",
    "sleep-environment": "/media/glow.jpg",
    "recovery-habits": "/media/glow.jpg",
    "consistent-schedules": "/media/glow.jpg"
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
        return <_r key={e.slug} href={Op(`/start/discover/${j.slug}/${e.slug}`, email)} data-discover="true"><section className="app-card h-full overflow-hidden transition hover:border-cyan/40">{src ? <img alt={e.title[lang]} src={src} className="h-36 w-full object-cover"/> : <div aria-hidden="true" className="grid h-36 place-items-center bg-[radial-gradient(circle_at_30%_20%,rgba(73,210,255,0.35),transparent_40%),linear-gradient(160deg,#12305f,#07101f)] font-display text-2xl text-cyan">{e.title[lang].charAt(0).toUpperCase()}</div>}<div className="p-4"><p className="text-xs uppercase tracking-wide text-faint">{t_1(`tag.${e.tag}`)}</p><h2 className="mt-1 font-semibold">{e.title[lang]}</h2><p className="mt-1 line-clamp-2 text-sm text-mist">{e.text[lang]}</p></div></section></_r>;
    })}</div>}</div></n.GV>;
}
