// @ts-nocheck
/* eslint-disable */
import * as l from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";
import { r } from "./module-4211.jsx";

import _r from "../shim/link.jsx";
import * as i from "./module-4230.jsx";
import * as c from "./module-3677.jsx";
export function SavedClient() {
    let { email } = IG();
    let { t, lang } = c.s9();
    let { saved } = r();
    return <l.GV current="/start/profile"><l.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t("profile.saved")}</h1>{saved.length === 0 ? <section className="app-card p-5"><p className="font-display text-xl">{t("saved.empty")}</p><p className="mt-2 text-sm leading-6 text-mist">{t("saved.emptyText")}</p><_r href={Op("/start/discover", email)} className="app-btn mt-4">{t("discover.title")}</_r></section> : <section className="app-card divide-y divide-white/5">{saved.map((r)=>{
        let [l, c] = r.split("/");
        let d = i.Rm(l, c);
        if (d) {
            return <_r key={r} href={Op(`/start/discover/${l}/${c}`, email)} className="block px-5 py-4 hover:bg-white/5"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-faint">{t(`tag.${d.tag}`)}</p><p className="mt-1 text-sm font-semibold">{d.title[lang]}</p></_r>;
        }
        return null;
    })}</section>}</div></l.GV>;
}
