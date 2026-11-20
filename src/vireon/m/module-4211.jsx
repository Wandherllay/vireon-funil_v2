// @ts-nocheck
/* eslint-disable */
import * as s from "react";
let r = "vireon.member.saved";
function useL() {
    let [saved, setSaved] = s.useState([]);
    let [ready, setReady] = s.useState(false);
    s.useEffect(()=>{
        try {
            let e = window.localStorage.getItem(r);
            setSaved(e ? JSON.parse(e) : []);
        } catch (e) {
            setSaved([]);
        }
        setReady(true);
    }, []);
    return {
        saved,
        toggle: s.useCallback((e)=>{
            setSaved((t)=>{
                let a = t.includes(e) ? t.filter((t)=>t !== e) : [
                    ...t,
                    e
                ];
                try {
                    window.localStorage.setItem(r, JSON.stringify(a));
                } catch (e) {}
                return a;
            });
        }, []),
        ready
    };
}
export { useL as r };
export let N = (e, t)=>`${e}/${t}`;
