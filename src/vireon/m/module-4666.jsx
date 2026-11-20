// @ts-nocheck
/* eslint-disable */
import * as a from "react";
export let PO = "vireon.member.email";
let o = "vireon.member.name";
export function IG() {
    let [e, setE] = a.useState(null);
    let [i, setI] = a.useState(null);
    let [ready, setReady] = a.useState(false);
    a.useEffect(()=>{
        let e = new URLSearchParams(window.location.search).get("email");
        if (e) {
            window.localStorage.setItem(PO, e);
            setE(e);
        } else {
            setE(window.localStorage.getItem(PO));
        }
        setI(window.localStorage.getItem(o));
        setReady(true);
    }, []);
    return {
        email: e,
        name: i?.trim() || (e ? e.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (e)=>e.toUpperCase()) : "Member"),
        ready
    };
}
export function Op(e, t) {
    if (t) {
        return `${e}?email=${encodeURIComponent(t)}`;
    }
    return e;
}
export function CI() {
    window.localStorage.removeItem(PO);
    window.localStorage.removeItem(o);
}
export function NC() {
    let [name, setName] = a.useState(null);
    a.useEffect(()=>{
        setName(window.localStorage.getItem(o));
    }, []);
    return {
        name,
        save: a.useCallback((e)=>{
            ((e)=>{
                try {
                    window.localStorage.setItem(o, e.trim());
                } catch (e) {}
            })(e);
            setName(e.trim());
        }, [])
    };
}
