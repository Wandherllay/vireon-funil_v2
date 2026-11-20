// @ts-nocheck
/* eslint-disable */
import * as r from "./module-773.jsx";

import * as n from "./module-3677.jsx";
let l = [
    1,
    2,
    3,
    4,
    5
];
export function HelpClient() {
    let { t: t_1 } = n.s9();
    return <r.GV current="/start/profile"><r.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("help.title")}</h1><div className="space-y-3">{l.map((t)=><section key={t} className="app-card p-5"><h2 className="font-semibold">{t_1(`help.${t}.q`)}</h2><p className="mt-2 text-sm leading-6 text-mist">{t_1(`help.${t}.a`)}</p></section>)}<section className="app-card p-5 text-sm leading-6 text-mist">{t_1("help.emergency")}</section></div></div></r.GV>;
}
