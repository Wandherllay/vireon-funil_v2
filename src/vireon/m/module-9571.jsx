// @ts-nocheck
/* eslint-disable */
import * as s from "react";
let r = "vireon.member.habits";
let l = "vireon.member.tasks";
let n = "vireon.member.days";
let i = "vireon.member.recent";
let o = "vireon.member.reads";
let c = "vireon:progress";
let d = ()=>new Date().toISOString();
let h = ()=>{
    let e = new Date;
    return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
};
let m = (e)=>`${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
let p = (e)=>m(new Date(e));
function u(e, t) {
    try {
        let a = window.localStorage.getItem(e);
        if (a) {
            return JSON.parse(a);
        }
        return t;
    } catch (e) {
        return t;
    }
}
function x(e, t) {
    try {
        window.localStorage.setItem(e, JSON.stringify(t));
    } catch (e) {}
    window.dispatchEvent(new Event(c));
}
function g(label) {
    let t = u(i, []);
    x(i, [
        {
            label,
            at: d()
        },
        ...t
    ].slice(0, 8));
}
function useB() {
    let [t, setT] = s.useState({});
    let [b, setB] = s.useState({});
    let [completedDays, setCompletedDays] = s.useState([]);
    let [recent, setRecent] = s.useState([]);
    let [reads, setReads] = s.useState([]);
    let S = s.useCallback(()=>{
        setT(u(r, {}));
        setB(u(l, {}));
        setCompletedDays(Object.keys(u(n, {})));
        setRecent(u(i, []));
        setReads(u(o, []));
    }, []);
    s.useEffect(()=>{
        S();
        window.addEventListener(c, S);
        return ()=>window.removeEventListener(c, S);
    }, [
        S
    ]);
    let todayHabits = t[h()] ?? [];
    let toggleHabit = s.useCallback((e, t)=>{
        let s = h();
        let l = u(r, {});
        let n = l[s] ?? [];
        let i = n.includes(e) ? n.filter((t)=>t !== e) : [
            ...n,
            e
        ];
        x(r, {
            ...l,
            [s]: i
        });
        if (i.includes(e)) {
            g(t);
        }
    }, []);
    let toggleTask = s.useCallback((e, label)=>{
        let a = u(l, {});
        if (e in a) {
            let t = {
                ...a
            };
            delete t[e];
            x(l, t);
            return;
        }
        x(l, {
            ...a,
            [e]: {
                label,
                at: d()
            }
        });
        g(label);
    }, []);
    let completeDay = s.useCallback((e, t)=>{
        let a = u(n, {});
        if (!(e in a)) {
            x(n, {
                ...a,
                [e]: d()
            });
            g(t);
        }
    }, []);
    let logRead = s.useCallback((title, module, slug)=>{
        let s = u(o, []).filter((e)=>!(e.module === module && e.slug === slug));
        x(o, [
            {
                title,
                module,
                slug,
                at: d()
            },
            ...s
        ].slice(0, 12));
    }, []);
    let activeDayKeys = new Set([
        ...Object.entries(t).filter(([, t])=>t.length > 0).map(([t])=>t),
        ...Object.values(b).map((e)=>p(e.at)),
        ...Object.values(u(n, {})).map((e)=>p(e))
    ]);
    let last28 = Array.from({
        length: 28
    }, (e, t)=>{
        let a = new Date;
        a.setDate(a.getDate() - (27 - t));
        return m(a);
    });
    return {
        habits: t,
        todayHabits,
        tasks: b,
        toggleHabit,
        toggleTask,
        completedDays,
        completeDay,
        recent,
        reads,
        logRead,
        activeDays: last28.filter((e)=>activeDayKeys.has(e)).length,
        activeDayKeys,
        last28
    };
}
export { useB as p };
