// @ts-nocheck
/* eslint-disable */
import { Z } from "./module-1883.jsx";
import { H } from "./module-9542.jsx";
import { IG, Op } from "./module-4666.jsx";

import _n from "../shim/link.jsx";
import * as s from "../shim/navigation.js";
import * as c from "./module-3677.jsx";
let h = {
    home: <><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></>,
    trick: <><path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/></>,
    programs: <><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></>,
    discover: <><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/></>,
    progress: <><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>,
    profile: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    bell: <><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></>
};
function PComponent({ name, size = 18 }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">{h[name]}</svg>;
}
let u = [
    {
        label: "nav.home",
        href: "/start",
        icon: "home"
    },
    {
        label: "nav.trick",
        href: "/start/trick",
        icon: "trick"
    },
    {
        label: "nav.programs",
        href: "/start/programs",
        icon: "programs"
    },
    {
        label: "nav.discover",
        href: "/start/discover",
        icon: "discover"
    },
    {
        label: "nav.progress",
        href: "/start/progress",
        icon: "progress"
    },
    {
        label: "nav.profile",
        href: "/start/profile",
        icon: "profile"
    }
];
export function GV({ current, children }) {
    let { email } = IG();
    let { t: t_1 } = c.s9();
    let m = s.usePathname();
    return <div className="app-shell"><div className="app-glow"/><a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-3 focus:py-2 focus:text-night">{t_1("shell.skip")}</a><aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-white/10 bg-ink-950/90 p-4 backdrop-blur md:flex"><Z href={Op("/start", email)}/><p className="mt-2 px-1 text-[11px] uppercase tracking-[0.18em] text-faint">{t_1("brand.tagline")}</p><nav className="mt-8 space-y-1" aria-label="Main">{u.map((e)=>{
        let i = e.href === current;
        return <_n key={e.href} href={Op(e.href, email)} aria-current={i ? "page" : undefined} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${i ? "bg-accent text-white" : "text-mist hover:bg-white/5 hover:text-white"}`}><PComponent name={e.icon}/><span>{t_1(e.label)}</span></_n>;
    })}</nav></aside><div className="min-w-0 md:pl-[248px]"><header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/5 bg-ink-950/80 px-4 py-3 backdrop-blur"><div className="min-w-0 md:hidden"><Z href={Op("/start", email)} markOnly/></div><p className="hidden text-sm text-mist md:block">{t_1("shell.edu")}</p><div className="flex shrink-0 items-center gap-2"><H/><_n href={Op("/start/notifications", email)} aria-label={t_1("notifications.unreadLabel", {
        n: 1
    })} aria-current={m === "/start/notifications" ? "page" : undefined} className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10"><PComponent name="bell"/><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan"/></_n></div></header><main id="content" className="mx-auto w-full min-w-0 max-w-5xl px-4 pb-28 pt-5 md:px-8 md:pb-12">{children}</main><nav className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink-950/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden" aria-label="Main"><ul className="grid grid-cols-6">{u.map((e)=>{
        let i = e.href === current;
        return <li key={e.href}><_n href={Op(e.href, email)} aria-current={i ? "page" : undefined} className={`flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 px-0.5 text-center text-[11px] leading-tight ${i ? "text-cyan" : "text-faint"}`}><PComponent name={e.icon}/><span className="truncate">{t_1(e.label)}</span></_n></li>;
    })}</ul></nav></div></div>;
}
export function wc() {
    let { t } = c.s9();
    return <p className="mb-4 rounded-2xl border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-warn">{t("demo.notice")}</p>;
}
