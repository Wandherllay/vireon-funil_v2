// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";

import _s from "../shim/link.jsx";
import * as l from "react";
import * as c from "./module-3677.jsx";
import * as o from "./module-5751.jsx";
export function ProgramsClient() {
    let { email } = IG();
    let { t } = c.s9();
    let [h, setH] = l.useState(null);
    l.useEffect(()=>{
        setH(window.localStorage.getItem("vireon.member.program"));
    }, []);
    return <i.GV current="/start/programs"><i.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t("programs.title")}</h1><p className="text-sm leading-6 text-mist">{t("programs.sub2")}</p>{o.i.map((a)=>{
        let n = a.slug === "7-day-starter" ? 1 : 2;
        let started = h === a.slug;
        return <section key={a.slug} className={`app-card p-5 ${a.theme === "cyan" ? "bg-[radial-gradient(420px_160px_at_100%_0%,rgba(73,210,255,0.2),transparent_55%),rgba(16,26,46,0.94)]" : "bg-[radial-gradient(420px_160px_at_100%_0%,rgba(47,123,255,0.28),transparent_55%),rgba(16,26,46,0.94)]"}`}><p className="text-xs uppercase tracking-[0.16em] text-cyan">{t(`programs.${n}.tag`)}</p><h2 className="mt-2 font-display text-2xl">{t(`programs.${n}.title`)}</h2><p className="mt-2 text-sm leading-6 text-mist">{t(`programs.${n}.text`)}</p><_s href={Op(`/start/programs/${a.slug}`, email)}><span className="app-btn mt-4 inline-flex w-auto">{started ? t("programs.openProgram") : t("programs.cta")}</span></_s></section>;
    })}</div></i.GV>;
}