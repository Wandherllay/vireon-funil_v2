// @ts-nocheck
/* eslint-disable */
import { Z } from "./module-1883.jsx";
import { Wr, bw } from "./module-2523.jsx";
import { Zb } from "./module-3532.jsx";

import _l from "../shim/link.jsx";
import * as n from "react";
import * as c from "../shim/navigation.js";
import * as m from "./module-3677.jsx";
function PComponent() {
    let e = c.useRouter();
    let { t: t_1 } = m.s9();
    let [t, setT] = n.useState("");
    let [l, setL] = n.useState("");
    let [u, setU] = n.useState("");
    let [h, setH] = n.useState(false);
    return <><form onSubmit={function(s) {
        s.preventDefault();
        setU("");
        if (t.trim() === Wr.email && l === Wr.password) {
            setH(true);
            try {
                sessionStorage.setItem(Zb, "1");
            } catch (e) {}
            e.push("/admin");
            return;
        }
        setU(t_1("admin.wrongLogin"));
    }} className="space-y-4"><label className="block"><span className="mb-1.5 block text-sm text-mist">{t_1("admin.fieldEmail")}</span><input type="email" required autoComplete="username" value={t} onChange={(e)=>setT(e.target.value)} className="app-input"/></label><label className="block"><span className="mb-1.5 block text-sm text-mist">{t_1("admin.fieldPassword")}</span><input type="password" required autoComplete="current-password" value={l} onChange={(e)=>setL(e.target.value)} className="app-input"/></label>{u && <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{u}</p>}<button type="submit" disabled={h} className="app-btn">{t_1(h ? "admin.signingIn" : "admin.signInAdmin")}</button></form><p className="mt-4 text-sm text-mist"><_l href={bw.login} className="text-cyan">{t_1("admin.student")}</_l></p></>;
}
function UComponent() {
    let { t } = m.s9();
    return <div className="app-shell"><div className="app-glow"/><main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10"><Z/><section className="app-card mt-6 p-6"><h1 className="font-display text-3xl">{t("admin.panel")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t("admin.loginSub")}</p><div className="mt-6"><PComponent/></div></section></main></div>;
}
export { UComponent as default };
