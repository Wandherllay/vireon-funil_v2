// @ts-nocheck
/* eslint-disable */
import { IG, Op } from "./module-4666.jsx";

import _n from "../shim/link.jsx";
import * as s from "../shim/navigation.js";
import * as r from "./module-3677.jsx";
let c = [
    {
        key: "trick.protocol",
        href: "/start/trick/protocol"
    },
    {
        key: "trick.kegel",
        href: "/start/trick/kegel"
    },
    {
        key: "trick.lessons",
        href: "/start/trick/lessons"
    },
    {
        key: "trick.secrets",
        href: "/start/trick/secrets"
    },
    {
        key: "trick.recipes",
        href: "/start/trick/recipes"
    },
    {
        key: "trick.tonic",
        href: "/start/trick/tonic"
    }
];
export function v({ extra = [] }) {
    let { t: t_1 } = r.s9();
    let { email } = IG();
    let d = s.usePathname();
    let h = [
        ...c,
        ...extra
    ];
    return <nav aria-label="Trick" className="sticky top-16 z-10 -mx-4 mb-4 border-b border-white/10 bg-ink-950/95 px-4 backdrop-blur"><ul className="flex w-full gap-2 overflow-x-auto overscroll-x-contain py-2">{h.map((e)=>{
        let t = d === e.href || d.startsWith(`${e.href}/`);
        return <li key={e.href} className="shrink-0"><_n href={Op(e.href, email)} aria-current={t ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold ${t ? "bg-accent text-white" : "bg-white/5 text-mist"}`}>{t_1(e.key)}</_n></li>;
    })}</ul></nav>;
}
