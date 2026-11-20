// @ts-nocheck
/* eslint-disable */
import * as a from "../shim/navigation.js";
import { fv } from "./module-6885.jsx";
import { d } from "./module-6171.jsx";

import * as r from "react";
let i = {
    red: "border-red-500/40 bg-red-50/70 text-red-700",
    blue: "border-blue-500/40 bg-blue-50/70 text-blue-700"
};
let o = {
    1: 33,
    2: 66,
    3: 99
};
export function UpsellShell({ step, notice, noticeTone, module, status, title, intro, preview, pillar, selection, price, buyHref, buyText, guarantee, declineText, declineTo, verification }) {
    let C = a.useRouter();
    let { temUtm, externo } = fv();
    let ORef = r.useRef(null);
    r.useEffect(()=>{
        if (!temUtm) {
            return;
        }
        let e = setTimeout(()=>ORef.current?.click(), 14000);
        return ()=>clearTimeout(e);
    }, [
        temUtm
    ]);
    return <main className="up-page relative"><img src="/images/bg-up2prosp-portal.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.12]" width={1024} height={1536}/><div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 50% 13%, oklch(0.92 0.06 240 / 50%), transparent 36%), linear-gradient(180deg, oklch(1 0 0 / 84%), oklch(0.94 0.05 245 / 78%))"
    }}/><div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col px-4 pt-4"><header className="shrink-0"><div className={`mb-2 rounded-lg border px-3 py-1.5 text-center ${i[noticeTone]}`}><p className="text-[10px] font-black uppercase tracking-wide">{notice}</p></div><div className="mb-2 flex items-center justify-between"><div><p className="text-[9px] font-black uppercase tracking-[0.24em] text-[color:var(--steel-deep)]">{module}</p><p className="text-sm font-black uppercase">Step {step} of 3</p></div><span className="rounded-full border border-[color:var(--steel)] bg-white/65 px-3 py-1 text-[10px] font-black text-[color:var(--steel-deep)]">{o[step]}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/75"><div className="h-full rounded-full transition-all duration-500" style={{
        width: `${o[step]}%`,
        background: "linear-gradient(90deg, var(--steel-deep), var(--steel-soft), var(--steel))"
    }}/></div></header><section className="up-fade up-shell mt-4 rounded-[22px] p-6 text-center"><div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--steel)]/60 bg-white/70 px-3 py-1"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--steel-deep)]"/><p className="text-[9px] font-black uppercase tracking-[0.22em] text-[color:var(--steel-deep)]">{status}</p></div><h1 className="mx-auto max-w-[370px] text-[22px] font-black uppercase leading-[1.05]">{title}</h1><p className="mx-auto mt-3 max-w-[340px] text-[13px] font-bold leading-snug text-[color:var(--up-ink)]">{intro}</p>{verification && <UComponent gate={verification} hasUtm={temUtm} href={externo(buyHref)}/>}{preview && <P1Component label={preview.label} items={preview.items}/>}<div className="mt-5 grid grid-cols-3 gap-1.5 text-left">{pillar.map((e)=><div key={e.title} className="rounded-lg border border-[color:var(--steel)]/30 bg-white/80 p-2 text-center"><p className="text-base">{e.icon}</p><p className="text-[9px] font-black uppercase leading-tight text-[color:var(--steel-deep)]">{e.title}</p></div>)}</div><div className="mt-5 rounded-2xl border-2 border-[color:var(--steel)] bg-white/90 p-4 text-left shadow-[0_8px_24px_-12px_oklch(0.4_0.16_252_/_60%)]"><div className="flex items-center gap-3"><span className="text-2xl text-[color:var(--steel-deep)]">{selection.title.split("|")[0]}</span><div className="flex-1"><p className="text-[12px] font-black uppercase leading-tight">{selection.title.split("|")[1]}</p><p className="mt-1 text-[11px] font-bold text-[color:var(--up-muted)]">{selection.detail}</p></div><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[linear-gradient(135deg,var(--steel-deep),var(--steel))] text-white shadow"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7"/></svg></div></div></div><div className="mt-4 space-y-3">{!temUtm && <div className="up-price" role="group" aria-label={`One-time payment: ${d(price)}`}><span>One-time payment</span><strong>{d(price)}</strong></div>}<button ref={ORef} type="button" onClick={function() {
        window.location.href = externo(buyHref);
    }} className="up-cta block w-full rounded-2xl px-5 py-6 text-[17px] font-black uppercase tracking-wider">{buyText}</button><p className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--steel-deep)]">{guarantee}</p><button type="button" onClick={function() {
        if (temUtm) {
            window.location.href = externo(buyHref);
        } else {
            C.push(declineTo);
        }
    }} className="w-full bg-transparent text-[10px] font-medium text-[color:var(--up-muted)] underline">{declineText}</button></div></section></div></main>;
}
function UComponent({ gate, hasUtm, href }) {
    let [n, setN] = r.useState(false);
    let [i, setI] = r.useState(false);
    return <div className="mt-6 rounded-2xl border-2 border-dashed border-[color:var(--steel)]/30 bg-white/50 p-5">{i ? <div className="up-fade text-left"><div className="flex items-center gap-2 text-green-600"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg><p className="text-[12px] font-black uppercase">{gate.compatible}</p></div><p className="mt-2 text-[12.5px] font-medium leading-relaxed text-[color:var(--up-ink)]"><span className="font-black text-red-600">{gate.attention}</span> {gate.detection}</p><div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-2"><p className="text-[10px] font-bold leading-tight text-green-800">{gate.hardness} <span className="text-[11px] font-black uppercase tracking-tighter">{gate.max}</span></p><p className="mt-1 text-[10px] font-bold leading-tight text-green-800">{gate.response} <span className="text-[11px] font-black uppercase tracking-tighter">{gate.under72}</span></p></div></div> : <div className="text-center"><p className="text-[11px] font-black uppercase tracking-wider text-[color:var(--steel-deep)]">{gate.title}</p><p className="mt-2 text-[13px] font-bold text-[color:var(--up-ink)]">{gate.text}</p><button type="button" onClick={function() {
        setN(true);
        window.setTimeout(()=>{
            setN(false);
            setI(true);
            if (hasUtm) {
                window.setTimeout(()=>window.location.href = href, 3000);
            }
        }, 1500);
    }} disabled={n} className="mt-4 w-full rounded-xl bg-[color:var(--steel-deep)] py-3 text-[12px] font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-95">{n ? gate.verifying : gate.button}</button></div>}</div>;
}
let x = {
    "45° Angle": "Direct stimulation of the female G-spot.",
    "Variable Rhythm": "The key to multiple orgasms.",
    "3-3 Control": "Technique to last over 40 minutes."
};
function P1Component({ label, items }) {
    let [a, setA] = r.useState(null);
    return <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/90 p-5 shadow-2xl"><p className="mb-4 text-[10px] font-black uppercase tracking-widest text-blue-400">{label}</p><div className="space-y-3">{items.map((e, t)=>{
        let [s, r] = e.split("|");
        let c = a === t;
        return <button key={r} type="button" onClick={()=>setA(c ? null : t)} className={`w-full rounded-xl border p-3 text-left transition-all ${c ? "border-blue-400 bg-blue-600" : "border-slate-700 bg-slate-800"}`}><div className="flex items-center gap-3"><span className="text-xl">{s}</span><span className="text-[13px] font-black uppercase text-white">{r}</span><span className="ml-auto text-blue-400">{c ? "−" : "+"}</span></div>{c && <p className="up-fade mt-2 text-[11.5px] leading-snug text-blue-100">{x[r]}</p>}</button>;
    })}</div></div>;
}
