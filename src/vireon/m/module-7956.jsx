// @ts-nocheck
/* eslint-disable */
import * as c from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";

import _r from "../shim/link.jsx";
import * as n from "react";
import * as i from "./module-4230.jsx";
import * as o from "./module-3677.jsx";
export function DiscoverClient() {
    let { email } = IG();
    let { t, lang } = o.s9();
    let [r, setR] = n.useState("");
    let m = r.trim().toLowerCase();
    let x = n.useMemo(()=>{
        if (m) {
            return i.R6.flatMap((e)=>e.items.filter((e)=>`${e.title[lang]} ${e.text[lang]}`.toLowerCase().includes(m)).map((t)=>({
                        category: e.slug,
                        slug: t.slug,
                        title: t.title[lang]
                    })));
        }
        return [];
    }, [
        m,
        lang
    ]);
    return <c.GV current="/start/discover"><c.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t("discover.title")}</h1><input value={r} onChange={(e)=>setR(e.target.value)} placeholder={t("discover.search")} aria-label={t("discover.searchLabel")} className="app-input"/>{m && <section className="app-card space-y-2 p-4 text-sm">{x.length === 0 ? <p className="text-mist">{t("discover.noMatch")}</p> : x.map((t)=><_r key={`${t.category}/${t.slug}`} href={Op(`/start/discover/${t.category}/${t.slug}`, email)} className="block text-cyan">{t.title}</_r>)}</section>}<div className="grid gap-3 sm:grid-cols-2">{i.R6.map((a)=><_r key={a.slug} href={Op(`/start/discover/${a.slug}`, email)}><section className="app-card h-full p-5 transition hover:border-cyan/40"><h2 className="font-display text-xl">{t(a.titleKey)}</h2><p className="mt-2 text-sm leading-6 text-mist">{t(a.textKey)}</p></section></_r>)}</div></div></c.GV>;
}
