// @ts-nocheck
/* eslint-disable */
import * as s from "react";
let r = "app_utms";
let n = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
    "fbclid",
    "gclid",
    "ttclid",
    "ic",
    "ref",
    "src",
    "cid"
];
function c() {
    try {
        let e = localStorage.getItem(r);
        let t = e ? JSON.parse(e) : null;
        if (t && typeof t === "object") {
            return t;
        }
        return {};
    } catch (e) {
        return {};
    }
}
function l(e) {
    let t = e.toLowerCase();
    return t === "utm" || t.startsWith("utm_");
}
export function fv() {
    let [utms, setUtms] = s.useState({});
    let [temUtm, setTemUtm] = s.useState(false);
    s.useEffect(()=>{
        let e = (()=>{
            let e = new URLSearchParams(window.location.search);
            let t = {};
            for (let a of n){
                let s = e.get(a);
                if (s) {
                    t[a] = s;
                }
            }
            return t;
        })();
        if (Object.keys(e).length) {
            try {
                localStorage.setItem(r, JSON.stringify(e));
            } catch (e) {}
        }
        let a = Object.keys(e).length ? e : c();
        setUtms(a);
        setTemUtm(Object.keys(a).some(l));
    }, []);
    return {
        utms,
        temUtm,
        interno: s.useCallback((e)=>typeof window === "undefined" ? e : `${e}${window.location.search}${window.location.hash}`, []),
        externo: s.useCallback((e)=>{
            let t = e;
            if (typeof window === "undefined") {
                return t;
            }
            if (t.endsWith("/")) {
                t = t.slice(0, -1);
            }
            let a = new URLSearchParams(window.location.search);
            let s = {
                ...c()
            };
            a.forEach((e, t)=>{
                s[t] = e;
            });
            if (!Object.keys(s).length) {
                return t;
            }
            try {
                let e = new URL(t);
                for (let [t, a] of Object.entries(s)){
                    if (!(t === "offerproductid" || e.searchParams.has(t))) {
                        e.searchParams.set(t, a);
                    }
                }
                return e.toString();
            } catch (e) {
                return t;
            }
        }, [])
    };
}
