// @ts-nocheck
/* eslint-disable */

import * as a from "react";
import * as i from "./module-7629.jsx";
import * as l from "./module-3677.jsx";
import * as c from "./module-6390.jsx";
export function AdminSettingsClient() {
    let { t: t_1 } = l.s9();
    let { ready, settings, counts, saveSettings, removeSampleData } = c.z8();
    let [o, setO] = a.useState("");
    let [x, setX] = a.useState(true);
    let [h, setH] = a.useState("");
    a.useEffect(()=>{
        if (ready) {
            setO(settings.supportEmail);
            setX(settings.showPendingClinicalContent);
        }
    }, [
        ready,
        settings
    ]);
    return <i.i><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("admin.settings.title")}</h1><section className="app-card p-5"><form className="space-y-3" onSubmit={function(s) {
        s.preventDefault();
        saveSettings({
            supportEmail: o,
            showPendingClinicalContent: x
        });
        setH(t_1("admin.settings.saved"));
    }}><label className="block"><span className="mb-1.5 block text-sm text-mist">{t_1("admin.settings.support")}</span><input name="supportEmail" type="email" className="app-input" value={o} onChange={(e)=>setO(e.target.value)}/></label><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="showPending" checked={x} onChange={(e)=>setX(e.target.checked)}/>{t_1("admin.settings.pending")}</label><button type="submit" className="app-btn w-auto">{t_1("admin.settings.save")}</button></form>{h && <p className="mt-3 text-sm text-mist" role="status">{h}</p>}</section><section className="app-card p-5"><h2 className="font-display text-xl">{t_1("admin.settings.sampleTitle")}</h2><p className="mt-2 text-sm leading-6 text-mist">{t_1("admin.settings.sampleText")}</p><button type="button" onClick={function() {
        if (window.confirm(t_1("admin.settings.removeConfirm"))) {
            removeSampleData();
            setH(t_1("admin.settings.removed"));
        }
    }} disabled={!counts.sampleData} className="app-btn-danger mt-4 disabled:cursor-not-allowed disabled:opacity-50">{t_1("admin.settings.remove")}</button></section></div></i.i>;
}
