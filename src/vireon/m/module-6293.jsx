// @ts-nocheck
/* eslint-disable */
import * as l from "./module-773.jsx";
import * as i from "./module-7244.jsx";

import * as a from "react";
import * as n from "./module-3677.jsx";
let c = [
    {
        key: "trick.beginner",
        reps: 10,
        hold: 3,
        rest: 3,
        sets: 3
    },
    {
        key: "trick.intermediate",
        reps: 15,
        hold: 5,
        rest: 5,
        sets: 3
    },
    {
        key: "trick.advanced",
        reps: 20,
        hold: 10,
        rest: 10,
        sets: 3
    }
];
let o = [
    "trick.kegel.move1",
    "trick.kegel.move2",
    "trick.kegel.move3"
];
let d = [
    "trick.kegel.tip1",
    "trick.kegel.tip2",
    "trick.kegel.tip3"
];
let x = [
    "trick.kegel.beat",
    "trick.kegel.build",
    "trick.kegel.strong"
];
export function KegelClient() {
    let { t: t_1, lang } = n.s9();
    let [s, setS] = a.useState(0);
    let [m, setM] = a.useState(false);
    let [k, setK] = a.useState(0);
    let [g, setG] = a.useState("hold");
    let [j, setJ] = a.useState(0);
    let [v, setV] = a.useState(0);
    let NRef = a.useRef(null);
    let y = c[s];
    a.useEffect(()=>{
        let e = window.localStorage.getItem("vireon.kegel.done");
        setV(e ? Number(e) : 0);
    }, []);
    a.useEffect(()=>{
        if (m) {
            NRef.current = window.setInterval(()=>{
                setK((e)=>{
                    if (e > 1) {
                        return e - 1;
                    }
                    let t = g === "hold" ? "rest" : "hold";
                    setG(t);
                    if (g === "hold") {
                        setJ((e)=>e + 1);
                    }
                    if (t === "hold") {
                        return y.hold;
                    }
                    return y.rest;
                });
            }, 1000);
            return ()=>{
                if (NRef.current) {
                    window.clearInterval(NRef.current);
                }
            };
        }
    }, [
        m,
        g,
        y.hold,
        y.rest
    ]);
    return <l.GV current="/start/trick"><l.wc/><i.v/><div className="space-y-4"><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">{t_1("trick.kegel.tag")}</p><div><h1 className="font-display text-3xl">{t_1("trick.kegel.title")}</h1><p className="mt-2 text-sm leading-6 text-mist">{t_1("trick.kegel.sub")}</p></div><section className="app-card grid grid-cols-4 divide-x divide-white/5 p-4 text-center">{[
        {
            v,
            l: "trick.kegel.streak"
        },
        {
            v,
            l: "trick.kegel.week"
        },
        {
            v,
            l: "trick.kegel.month"
        },
        {
            v,
            l: "trick.kegel.total"
        }
    ].map((t)=><div key={t.l} className="px-1"><p className="font-display text-xl">{t.v}</p><p className="mt-0.5 text-[9px] uppercase leading-tight text-faint">{t_1(t.l)}</p></div>)}</section>{c.map((t, a)=><button key={t.key} type="button" onClick={()=>{
            setS(a);
            setM(false);
            setK(0);
        }} aria-pressed={s === a} className={`app-card block w-full p-4 text-left transition ${s === a ? "border-cyan/50" : "hover:border-white/20"}`}><p className="font-semibold">{t_1(t.key)}</p><p className="mt-0.5 text-xs text-mist">{t_1(x[a])}</p><p className="mt-2 text-sm font-semibold text-cyan">{t.reps} {t_1("trick.kegel.reps")}</p><p className="text-xs text-faint">{t_1("trick.kegel.hold")} {t.hold}s · {t_1("trick.kegel.rest")} {t.rest}s</p><p className="text-xs text-faint">{t.sets} {t_1("trick.kegel.sets")} · 30s {t_1("trick.kegel.between")}</p></button>)}<section className="app-card p-5 text-center"><p className="font-display text-4xl tabular-nums">{k}s</p><p className="mt-1 text-xs uppercase tracking-wide text-cyan">{m ? g === "hold" ? t_1("trick.kegel.hold") : t_1("trick.kegel.rest") : "—"}</p><p className="mt-1 text-xs text-faint">{j}/{y.reps} {t_1("trick.kegel.reps")}</p><button type="button" onClick={m ? function() {
        setM(false);
        setK(0);
        let e = v + 1;
        setV(e);
        window.localStorage.setItem("vireon.kegel.done", String(e));
    } : function() {
        setJ(0);
        setG("hold");
        setK(y.hold);
        setM(true);
    }} className="app-btn mt-4">{m ? t_1("trick.kegel.stop") : t_1("trick.kegel.start")}</button></section><section className="app-card p-5"><h2 className="font-display text-lg">{t_1("trick.kegel.how")}</h2><h3 className="mt-3 text-sm font-semibold">{t_1("trick.kegel.trains")}</h3><p className="mt-1.5 text-sm leading-6 text-mist">{t_1("trick.kegel.trainsText")}</p><h3 className="mt-4 text-sm font-semibold">{t_1("trick.kegel.moves")}</h3><ol className="mt-1.5 list-decimal space-y-1.5 pl-5 text-sm leading-6 text-mist">{o.map((t)=><li key={t}>{t_1(t)}</li>)}</ol><h3 className="mt-4 text-sm font-semibold">{t_1("trick.kegel.tips")}</h3><ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-sm leading-6 text-mist">{d.map((t)=><li key={t}>{t_1(t)}</li>)}</ul><span className="hidden">{lang}</span></section><section className="app-card space-y-2 p-5 text-xs leading-6 text-faint"><p>{t_1("legal.short")}</p><p>{t_1("legal.emergency")}</p></section></div></l.GV>;
}
