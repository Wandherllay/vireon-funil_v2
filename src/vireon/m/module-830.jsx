// @ts-nocheck
/* eslint-disable */
import { Z } from "./module-1883.jsx";
import { H } from "./module-9542.jsx";
import { PO } from "./module-4666.jsx";

import _i from "../shim/link.jsx";
import * as l from "../shim/navigation.js";
import * as c from "react";
import * as m from "./module-3677.jsx";
let u = {
    en: {
        tag: "Single-use invitation",
        title: "Create your access",
        sub: "This link is valid for one activation. Enter the email the invitation was sent to.",
        label: "Email",
        cta: "Activate access",
        code: "Invite code",
        have: "Already have access?",
        signIn: "Sign in"
    },
    pt: {
        tag: "Convite de uso único",
        title: "Crie seu acesso",
        sub: "Este link vale por uma ativação. Informe o e-mail para o qual o convite foi enviado.",
        label: "E-mail",
        cta: "Ativar acesso",
        code: "Código do convite",
        have: "Já tem acesso?",
        signIn: "Entrar"
    },
    es: {
        tag: "Invitación de uso único",
        title: "Crea tu acceso",
        sub: "Este enlace vale por una activación. Escribe el correo al que se envió la invitación.",
        label: "Correo",
        cta: "Activar acceso",
        code: "Código de invitación",
        have: "¿Ya tienes acceso?",
        signIn: "Entrar"
    }
};
export function InviteClient() {
    let e = l.useParams();
    let { lang } = m.s9();
    let [a, setA] = c.useState("");
    let x = u[lang];
    return <div className="app-shell"><div className="app-glow"/><main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10"><div className="flex items-center justify-between gap-3"><Z/><H/></div><section className="app-card mt-6 p-6"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{x.tag}</p><h1 className="mt-2 font-display text-3xl">{x.title}</h1><p className="mt-2 text-sm leading-6 text-mist">{x.sub}</p><form action="/start" onSubmit={()=>window.localStorage.setItem(PO, a.trim().toLowerCase())} className="mt-6 space-y-4"><label className="block"><span className="mb-1.5 block text-sm text-mist">{x.label}</span><input type="email" name="email" value={a} onChange={(e)=>setA(e.target.value)} required placeholder="you@email.com" className="app-input"/></label><button type="submit" className="app-btn">{x.cta}</button></form><p className="mt-4 break-all text-xs text-faint">{x.code}: {e.token}</p><p className="mt-2 text-sm text-mist">{x.have} <_i href="/login" className="text-cyan">{x.signIn}</_i></p></section></main></div>;
}
