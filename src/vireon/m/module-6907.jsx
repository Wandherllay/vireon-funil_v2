// @ts-nocheck
/* eslint-disable */
import * as i from "../shim/navigation.js";
import * as s from "react";
import * as o from "./module-3677.jsx";
let a = [
    [
        /^\/start$/,
        "nav.home"
    ],
    [
        /^\/start\/trick$/,
        "trick.title"
    ],
    [
        /^\/start\/trick\/kegel$/,
        "trick.kegel.title"
    ],
    [
        /^\/start\/trick\/lessons(\/.*)?$/,
        "trick.lessons.title"
    ],
    [
        /^\/start\/trick\/secrets(\/.*)?$/,
        "trick.secrets.title"
    ],
    [
        /^\/start\/trick\/recipes(\/.*)?$/,
        "trick.recipes.title"
    ],
    [
        /^\/start\/trick\/tonic$/,
        "trick.tonic.title"
    ],
    [
        /^\/start\/trick\/doctor$/,
        "trick.doctor.title"
    ],
    [
        /^\/start\/programs$/,
        "programs.title"
    ],
    [
        /^\/start\/programs\/[^/]+$/,
        "programs.title"
    ],
    [
        /^\/start\/programs\/[^/]+\/days\/[^/]+$/,
        "programs.dayTitle"
    ],
    [
        /^\/start\/discover(\/.*)?$/,
        "discover.title"
    ],
    [
        /^\/start\/progress$/,
        "progress.title"
    ],
    [
        /^\/start\/notifications$/,
        "notifications.title"
    ],
    [
        /^\/start\/profile$/,
        "profile.title"
    ],
    [
        /^\/start\/profile\/settings$/,
        "profile.settings"
    ],
    [
        /^\/start\/profile\/saved$/,
        "profile.saved"
    ],
    [
        /^\/start\/profile\/programs$/,
        "profile.programs"
    ],
    [
        /^\/start\/profile\/completed$/,
        "profile.programs"
    ],
    [
        /^\/start\/profile\/notifications$/,
        "profile.notifications"
    ],
    [
        /^\/start\/profile\/help$/,
        "profile.help"
    ],
    [
        /^\/start\/profile\/disclaimer$/,
        "profile.disclaimer"
    ],
    [
        /^\/start\/profile\/terms$/,
        "profile.terms"
    ],
    [
        /^\/start\/profile\/privacy$/,
        "profile.privacy"
    ],
    [
        /^\/start\/profile\/delete$/,
        "profile.delete"
    ]
];
export function TitleSync() {
    let t = i.usePathname();
    let { lang, t: t_1 } = o.s9();
    s.useEffect(()=>{
        if (!t || t !== "/start" && !t.startsWith("/start/")) {
            return;
        }
        let s = a.find(([r])=>r.test(t));
        let i = s ? t_1(s[1]) : null;
        let o = lang === "pt" ? "Protocolo Vireon" : lang === "es" ? "Protocolo Vireon" : "Vireon Protocol";
        document.title = i ? `${i} · ${o}` : o;
    }, [
        t,
        lang,
        t_1
    ]);
    return null;
}
