// @ts-nocheck
/* eslint-disable */
import { Z } from "./module-1883.jsx";
import { bw } from "./module-2523.jsx";
import { PO } from "./module-4666.jsx";
import { H } from "./module-9542.jsx";

import * as n from "../shim/navigation.js";
import _l from "../shim/link.jsx";
import * as c from "react";
import * as m from "./module-3677.jsx";
function PComponent() {
    let e = n.useRouter();
    let { t, lang } = m.s9();
    let [r, setR] = c.useState("");
    let [p, setP] = c.useState("");
    let h = {
        en: {
            label: "Email",
            invalid: "Enter a valid email.",
            cta: "Sign in",
            admin: "Administrator access"
        },
        pt: {
            label: "E-mail",
            invalid: "Informe um e-mail válido.",
            cta: "Entrar",
            admin: "Acesso de administrador"
        },
        es: {
            label: "Correo",
            invalid: "Escribe un correo válido.",
            cta: "Entrar",
            admin: "Acceso de administrador"
        }
    }[lang];
    return <form onSubmit={function(t) {
        t.preventDefault();
        let a = r.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)) {
            setP(h.invalid);
            return;
        }
        window.localStorage.setItem(PO, a);
        e.push(`/start?email=${encodeURIComponent(a)}`);
    }} className="space-y-4"><label className="block"><span className="mb-1.5 block text-sm text-mist">{h.label}</span><input type="email" value={r} onChange={(e)=>{
        setR(e.target.value);
        setP("");
    }} required autoComplete="username" placeholder="you@email.com" className="app-input"/></label>{p && <p className="text-sm text-warn">{p}</p>}<button type="submit" className="app-btn">{h.cta}</button><p className="text-sm text-mist"><_l href={bw.admin} className="text-cyan">{h.admin}</_l></p><span className="hidden">{t("nav.home")}</span></form>;
}
let h = {
    en: {
        title: "Sign in",
        sub: "Enter any email to open the app. No password."
    },
    pt: {
        title: "Entrar",
        sub: "Informe qualquer e-mail para abrir o app. Sem senha."
    },
    es: {
        title: "Entrar",
        sub: "Escribe cualquier correo para abrir la app. Sin contraseña."
    }
};
export function LoginClient() {
    let { lang } = m.s9();
    let t = h[lang];
    return <div className="app-shell"><div className="app-glow"/><main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10"><div className="flex items-center justify-between gap-3"><Z/><H/></div><section className="app-card mt-6 p-6"><h1 className="font-display text-3xl">{t.title}</h1><p className="mt-2 text-sm leading-6 text-mist">{t.sub}</p><div className="mt-6"><PComponent/></div></section></main></div>;
}
