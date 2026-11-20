// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import { CI } from "./module-4666.jsx";

import _r from "../shim/link.jsx";
import * as l from "react";
import * as c from "./module-3677.jsx";
export function DeleteClient() {
    let { t: t_1 } = c.s9();
    let [t, setT] = l.useState("");
    let [r, setR] = l.useState(false);
    if (r) {
        return <i.GV current="/start/profile"><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("delete.title")}</h1><section className="app-card p-5"><p className="text-sm leading-6 text-mist">{t_1("delete.done")}</p><_r href="/login" className="app-btn mt-4">{t_1("shell.signOut")}</_r></section></div></i.GV>;
    }
    return <i.GV current="/start/profile"><i.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("delete.title")}</h1><section className="app-card p-5"><p className="text-sm leading-6 text-mist">{t_1("delete.text")}</p><form onSubmit={function(e) {
        e.preventDefault();
        if (t.trim().toUpperCase() === "DELETE") {
            CI();
            setR(true);
        }
    }} className="mt-4 space-y-4"><label className="block"><span className="mb-1.5 block text-sm text-mist">{t_1("delete.label")}</span><input required value={t} onChange={(e)=>setT(e.target.value)} className="app-input"/></label><button type="submit" disabled={t.trim().toUpperCase() !== "DELETE"} className="app-btn-danger">{t_1("delete.cta")}</button></form></section></div></i.GV>;
}
