// @ts-nocheck
/* eslint-disable */
import * as n from "./module-773.jsx";
import { CI, IG, Op } from "./module-4666.jsx";

import _a from "../shim/link.jsx";
import * as i from "../shim/navigation.js";
import * as o from "./module-3677.jsx";
let p = [
    {
        key: "profile.help",
        href: "/start/profile/help"
    },
    {
        key: "profile.disclaimer",
        href: "/start/profile/disclaimer"
    },
    {
        key: "profile.terms",
        href: "/start/profile/terms"
    },
    {
        key: "profile.privacy",
        href: "/start/profile/privacy"
    }
];
export function ProfileClient() {
    let { email, name, ready } = IG();
    let { t: t_1, lang } = o.s9();
    let m = i.useRouter();
    let date = new Date().toLocaleDateString(o.ne[lang]);
    if (ready) {
        return <n.GV current="/start/profile"><n.wc/><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("profile.title")}</h1><section className="app-card p-5"><p className="font-display text-2xl">{name}</p><p className="mt-1 text-sm text-mist">{email ?? ""}</p><p className="mt-2 text-xs text-faint">{t_1("profile.access", {
            date
        })}</p></section><section className="app-card divide-y divide-white/5">{p.map((t)=><_a key={t.key} href={Op(t.href, email)} className="block px-5 py-4 text-sm font-medium hover:bg-white/5">{t_1(t.key)}</_a>)}</section><section className="app-card p-5"><h2 className="font-display text-lg">{t_1("profile.install")}</h2><p className="mt-2 text-sm leading-6 text-mist">{t_1("profile.installText")}</p></section><button type="button" onClick={()=>{
            CI();
            m.push("/login");
        }} className="app-btn-ghost w-full">{t_1("shell.signOut")}</button></div></n.GV>;
    }
    return null;
}
