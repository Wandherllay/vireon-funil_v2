// @ts-nocheck
/* eslint-disable */

import * as n from "./module-3677.jsx";
let o = {
    en: "EN",
    pt: "PT",
    es: "ES"
};
export function H() {
    let { lang, setLang } = n.s9();
    return <div role="group" aria-label="Language" className="inline-flex shrink-0 rounded-full border border-white/10 bg-night/80 p-0.5">{n.gq.map((i)=>{
        let n = i === lang;
        return <button key={i} type="button" onClick={()=>setLang(i)} aria-pressed={n} className={`min-h-11 min-w-11 rounded-full px-2 text-xs font-semibold transition ${n ? "bg-accent text-white" : "text-mist hover:text-white"}`}>{o[i]}</button>;
    })}</div>;
}
