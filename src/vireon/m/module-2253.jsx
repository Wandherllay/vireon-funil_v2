// @ts-nocheck
/* eslint-disable */
import * as c from "../shim/navigation.js";
import { $b, bw, ze } from "./module-2523.jsx";
import { d as d_1 } from "./module-6171.jsx";

import * as t from "react";
let o = "vireon_back_expires";
export function BackRedirect() {
    let e = c.useRouter();
    let [s, setS] = t.useState(600);
    let lRef = t.useRef(((e)=>{
        try {
            let s = new URL(e);
            new URLSearchParams(window.location.search).forEach((e, a)=>{
                if (!s.searchParams.has(a)) {
                    s.searchParams.set(a, e);
                }
            });
            return s.toString();
        } catch (s) {
            return e;
        }
    })($b.discount));
    t.useEffect(()=>{
        let e = 0;
        try {
            e = Number.parseInt(sessionStorage.getItem(o) ?? "", 10) || 0;
        } catch (e) {}
        if (!e) {
            e = Date.now() + 600000;
            try {
                sessionStorage.setItem(o, String(e));
            } catch (e) {}
        }
        let r = ()=>{
            setS(Math.max(0, Math.ceil((e - Date.now()) / 1000)));
            window.setTimeout(r, 250);
        };
        r();
    }, []);
    t.useEffect(()=>{
        let e = ()=>{
            try {
                history.pushState({
                    vireonOffer: 1
                }, "", window.location.href);
            } catch (e) {}
        };
        e();
        window.addEventListener("popstate", e);
        return ()=>window.removeEventListener("popstate", e);
    }, []);
    let d = String(Math.floor(s / 60)).padStart(2, "0");
    let u = String(s % 60).padStart(2, "0");
    return <div className="br-page"><div className="br-wrap"><div className="br-logo"><img src="/v2/esquizz/assets/logo-vireon.png" alt="Vireon"/></div><div className="br-card"><div className="br-badge"><span className="br-dot"/> Exclusive Offer</div><div className="br-icon" aria-hidden="true">🔓</div><div className="br-label">Wait — Don't leave</div><h1>Get the Complete Plan for<br/><span>{d_1(11.9)} instead of {d_1(ze.complete.charged)}</span></h1><p className="br-sub">You're about to leave the Complete plan behind. Protocol, daily plan, private login, and all 8 bonuses — an <strong>exclusive {d_1(11.1)} discount</strong>, only on this page.</p><div className="br-prices"><div className="br-old"><div className="br-k">Original price</div><b>{d_1(ze.complete.charged)}</b></div><div className="br-arrow">→</div><div className="br-now"><div className="br-k">Your price now</div><b>{d_1(11.9)}</b><div className="br-save">Save {d_1(11.1)}</div></div></div><div className="br-timer">⏱ Offer expires in: <span className="br-t">{d}</span> : <span className="br-t">{u}</span></div><a className="br-cta" id="claim" href={lRef.current}>Yes! Claim the Complete Plan for {d_1(11.9)}</a><button className="br-skip" type="button" onClick={function() {
        e.push(`${bw.offer}${window.location.search}${window.location.hash}`);
    }}>No thanks, I'll pay full price later</button><div className="br-foot">🔒 Secure payment · 30-day guarantee · Private login</div><div className="br-trust"><span>✅ Digital access</span><span>✅ Results vary</span></div><p className="br-note">Educational program. Not a substitute for medical advice.</p></div></div></div>;
}
