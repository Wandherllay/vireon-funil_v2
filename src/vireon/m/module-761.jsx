// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";

import _r from "../shim/link.jsx";
import * as n from "react";
import * as c from "./module-4230.jsx";
import * as o from "./module-3677.jsx";
import * as d from "./module-5751.jsx";
let x = [
    {
        href: "/start/discover/nutrition",
        key: "home.nutrition",
        icon: "leaf"
    },
    {
        href: "/start/discover/exercises",
        key: "home.exercise",
        icon: "dumbbell"
    },
    {
        href: "/start/discover/sleep",
        key: "home.sleep",
        icon: "moon"
    },
    {
        href: "/start/discover/stress",
        key: "home.stress",
        icon: "wind"
    }
];
let p = {
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6c1.1-.22 2.15-.53 2.92-1"/></>,
    dumbbell: <><path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/></>,
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>,
    wind: <><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></>
};
export function StartClient() {
    let { email, name } = IG();
    let { t: t_1, lang } = o.s9();
    let [g, setG] = n.useState(null);
    n.useEffect(()=>{
        setG(window.localStorage.getItem("vireon.member.program"));
    }, []);
    let b = g ? d.Kp(g) : null;
    let y = Math.floor(Date.now() / 86400000);
    let S = c.R6.flatMap((c_1)=>c_1.items.map((i_1)=>({
                c: c_1,
                i: i_1
            })));
    let M = S[y % S.length];
    let O = c.Rm(M.c.slug, M.i.slug);
    return <i.GV current="/start"><i.wc/><div className="space-y-4"><div><p className="text-sm text-mist">{t_1("home.welcome")}</p><h1 className="font-display text-3xl leading-tight sm:text-4xl">{name}</h1><p className="mt-1 text-sm text-faint">{t_1("home.sub")}</p></div><section className="app-card overflow-hidden bg-[radial-gradient(500px_180px_at_100%_0%,rgba(73,210,255,0.18),transparent_50%),rgba(16,26,46,0.92)] p-5">{b ? <div className="min-w-0"><h2 className="font-display text-xl sm:text-2xl">{t_1(`programs.${b.slug === "7-day-starter" ? 1 : 2}.title`)}</h2><_r href={Op(`/start/programs/${b.slug}`, email)}><span className="app-btn mt-4 inline-flex w-auto">{t_1("home.program.continue")}</span></_r></div> : <div><h2 className="font-display text-2xl">{t_1("home.program.title")}</h2><p className="mt-2 text-sm text-mist">{t_1("home.program.text")}</p><_r href={Op("/start/programs", email)}><span className="app-btn mt-4 inline-flex w-auto">{t_1("home.program.cta")}</span></_r></div>}</section>{O && <_r href={Op(`/start/discover/${M.c.slug}/${M.i.slug}`, email)} className="block"><section className="app-card p-5"><p className="text-xs uppercase tracking-[0.16em] text-cyan">{t_1("home.read.tag")}</p><h2 className="mt-2 font-display text-xl">{O.title[lang]}</h2><p className="mt-2 text-sm leading-6 text-mist">{O.text[lang]}</p></section></_r>}<div className="grid grid-cols-2 gap-3">{x.map((t)=><_r key={t.href} href={Op(t.href, email)} className="app-card p-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-cyan">{p[t.icon]}</svg><p className="mt-3 font-semibold">{t_1(t.key)}</p></_r>)}</div></div></i.GV>;
}