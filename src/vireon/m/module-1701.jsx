// @ts-nocheck
/* eslint-disable */
import * as n from "./module-773.jsx";

import * as r from "react";
import * as i from "./module-3677.jsx";
export function NotificationsClient() {
    let { t: t_1 } = i.s9();
    let [t, setT] = r.useState(false);
    return <n.GV current="/start/notifications"><n.wc/>{t ? <section className="app-card p-6 text-center"><h2 className="font-display text-xl">{t_1("notifications.empty")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t_1("notifications.emptyText")}</p></section> : <div className="space-y-3"><h1 className="font-display text-3xl">{t_1("notifications.title")}</h1><section className="app-card p-5"><div className="flex items-start justify-between gap-3"><h2 className="font-semibold">{t_1("notifications.welcome")}</h2><span className="text-xs text-cyan">{t_1("notifications.new")}</span></div><p className="mt-2 text-sm leading-6 text-mist">{t_1("notifications.welcomeText")}</p><button type="button" onClick={()=>setT(true)} className="app-btn-ghost mt-3">{t_1("notifications.markRead")}</button></section></div>}</n.GV>;
}
