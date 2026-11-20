// @ts-nocheck
/* eslint-disable */
import * as s from "./module-773.jsx";

import * as n from "./module-3677.jsx";
export function P({ titleKey, prefix, paragraphs }) {
    let { t: t_1 } = n.s9();
    return <s.GV current="/start/profile"><s.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t_1(titleKey)}</h1><section className="app-card p-5"><p className="whitespace-pre-wrap text-sm leading-7 text-mist">{Array.from({
        length: paragraphs
    }, (e, t)=>t_1(`${prefix}.p${t + 1}`)).join(" ")}</p></section></div></s.GV>;
}
