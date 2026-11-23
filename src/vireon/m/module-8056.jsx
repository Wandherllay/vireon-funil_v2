// @ts-nocheck
/* eslint-disable */
import * as l from "../shim/navigation.js";
import * as o from "./module-4439.jsx";
import { A8, TD } from "./module-7439.jsx";
import { W7, bw } from "./module-2523.jsx";
import { fv } from "./module-6885.jsx";

import * as n from "react";
let i = [
    {
        id: "symptom",
        title: "What would you most like to improve?",
        help: "Choose the option that feels closest to your experience.",
        options: [
            "Stronger, more consistent firmness",
            "Feeling more confident during intimacy",
            "Maintaining firmness for longer",
            "Understanding changes in desire"
        ]
    },
    {
        id: "duration",
        title: "When did you first notice a change?",
        help: "A quick estimate is enough.",
        options: [
            "Recently (within 6 months)",
            "6 to 12 months ago",
            "1 to 3 years ago",
            "More than 3 years ago"
        ]
    },
    {
        id: "baking_soda",
        title: "Do you have baking soda at home?",
        help: "It is the main ingredient of your protocol.",
        options: [
            "Yes, I have some at home",
            "No, but I can get it easily"
        ],
        emojis: [
            "✅",
            "🛒"
        ]
    },
    {
        id: "lemon",
        title: "Do you have a fresh lemon or lemon juice at home?",
        help: "Lemon activates the alkaline reaction.",
        options: [
            "Yes",
            "No, but I can buy some"
        ],
        emojis: [
            "✅",
            "🛒"
        ]
    },
    {
        id: "spice",
        title: "Do you have ginger, cinnamon or pepper at home?",
        help: "One of them is your third ingredient. Which one depends on your answers.",
        options: [
            "Yes, I have at least one",
            "I'm not sure"
        ],
        emojis: [
            "✅",
            "⚠️"
        ]
    },
    {
        id: "allergy",
        title: "Are you allergic to any natural spice?",
        help: "We need to know this to adapt your formula safely.",
        options: [
            "No, no allergies",
            "Yes, I am allergic"
        ],
        emojis: [
            "✅",
            "⚠️"
        ]
    },
    {
        id: "tried",
        title: "What have you already tried to fix this problem?",
        help: "This helps us exclude what does NOT work from your protocol.",
        multiple: true,
        options: [
            "Viagra or Cialis",
            "Natural supplements",
            "Exercises (Kegel, etc.)",
            "Psychological therapy",
            "A visit to the urologist",
            "Nothing — this is the first time I'm looking for help"
        ]
    },
    {
        id: "goal",
        title: "What is your main goal?",
        help: "This calibrates the strength of your formula.",
        options: [
            "Get hard, lasting erections back",
            "Increase penis size",
            "Last longer in bed",
            "All of the above"
        ]
    },
    {
        id: "sleep",
        title: "How many hours do you sleep per night?",
        help: "Sleep duration affects the best time to take the mix.",
        options: [
            "Less than 5 hours",
            "5 to 7 hours",
            "7 to 9 hours",
            "More than 9 hours"
        ]
    },
    {
        id: "water",
        title: "How much water do you drink per day?",
        help: "Hydration speeds up the alkaline reaction of baking soda.",
        options: [
            "Almost none",
            "Less than 34 oz (1 L)",
            "34 to 68 oz (1–2 L)",
            "More than 68 oz (2 L)"
        ]
    },
    {
        id: "routine",
        title: "What does your day look like?",
        help: "This determines the best time to take the mix.",
        multiple: true,
        options: [
            "I work outside the home",
            "I work from home (remote)",
            "I take care of the home/family",
            "I am a student",
            "I am retired"
        ]
    }
];
let r = [
    "25–34 years",
    "35–44 years",
    "45–54 years",
    "55+ years"
];
let m = (e)=>i.findIndex((t)=>t.id === e);
let u = [
    2,
    3,
    4,
    6,
    7,
    8,
    9,
    12,
    13,
    14,
    15,
    16
];
let h = [
    [
        2,
        3,
        4
    ],
    [
        6,
        7,
        8,
        9
    ],
    [
        12,
        13,
        14,
        15,
        16
    ],
    [
        23
    ]
];
let p = [
    2,
    3,
    6,
    7,
    8,
    9,
    12,
    13,
    14,
    15,
    16
];
let f = {
    confirmed: {
        icon: "✅",
        color: "#2a9d6f"
    },
    selected: {
        icon: "✅",
        color: "#2a9d6f"
    },
    calibrated: {
        icon: "✅",
        color: "#2a9d6f"
    },
    pending: {
        icon: "🔒",
        color: "#aaa"
    }
};
let b = "esquiz_quiz_answers";
function g(e, t) {
    try {
        let s = JSON.parse(localStorage.getItem(b) ?? "{}");
        s[String(e)] = t;
        localStorage.setItem(b, JSON.stringify(s));
    } catch (e) {}
}
export function Quiz() {
    let e;
    let t = l.useRouter();
    let { interno } = fv();
    let [b, setB] = n.useState({
        kind: "question",
        index: m("symptom")
    });
    let [w, setW] = n.useState({});
    let [k, setK] = n.useState(null);
    let [M, setM] = n.useState(true);
    let [L, setL] = n.useState(0);
    let [W, setW_1] = n.useState(0);
    let [A, setA] = n.useState(null);
    let [Y, setY] = n.useState(false);
    let [R, setR] = n.useState(false);
    // Only two additional milestones: after question 6/11 and after question 11/11.
    // Never transmit answers. The central tracker deduplicates per browser session.
    n.useEffect(()=>{
        if (b.kind === "confirmed") {
            window.vireonTrack?.("quiz_midpoint", "6_of_11");
        } else if (b.kind === "calibrated") {
            window.vireonTrack?.("quiz_complete", "11_of_11");
        }
    }, [b.kind]);
    let V = b.kind === "question" ? b.index : -1;
    let Q = V >= 0 ? i[V] : null;
    let J = Q && (e = w[Q.id]) !== null && e !== undefined ? e : [];
    let Z = ((e)=>{
        switch(e.kind){
            case "age":
                return 4;
            case "question":
                return p[e.index];
            case "saved":
                return 5;
            case "confirmed":
                return 10;
            case "vsl":
                return 11;
            case "calibrated":
                return 17;
            case "analysis":
                return 18;
            case "howto":
                return 19;
            case "stories":
                return 20;
            case "loading":
                return 21;
            case "guarantee":
                return 22;
            default:
                return 23;
        }
    })(b);
    let ee = ((e)=>{
        for (let t of h){
            let a = t.indexOf(e);
            if (a !== -1) {
                return (a + 1) / t.length * 100;
            }
        }
        return 100;
    })(Z);
    u.includes(Z);
    let et = n.useCallback(()=>{
        try {
            sessionStorage.setItem("vireon_answers", JSON.stringify({
                ...w,
                ageBand: k
            }));
        } catch (e) {}
    }, [
        w,
        k
    ]);
    let ea = n.useCallback(()=>{
        et();
        try {
            localStorage.setItem("esquiz_quiz_completed", "1");
        } catch (e) {}
        t.push(interno(bw.offer));
    }, [
        et,
        t,
        interno
    ]);
    let es = n.useCallback(()=>{
        setB((e)=>{
            if (e.kind === "age") {
                return {
                    kind: "saved"
                };
            }
            if (e.kind === "question") {
                if (e.index === m("symptom")) {
                    return {
                        kind: "question",
                        index: m("duration")
                    };
                }
                if (e.index === m("duration")) {
                    return {
                        kind: "age"
                    };
                }
                if (e.index === m("allergy")) {
                    return {
                        kind: "confirmed"
                    };
                }
                let index = e.index + 1;
                if (index >= i.length) {
                    return {
                        kind: "calibrated"
                    };
                }
                return {
                    kind: "question",
                    index
                };
            }
            if (e.kind === "saved") {
                return {
                    kind: "question",
                    index: m("baking_soda")
                };
            }
            if (e.kind === "confirmed") {
                return {
                    kind: "vsl"
                };
            }
            if (e.kind === "vsl") {
                return {
                    kind: "question",
                    index: m("tried")
                };
            }
            if (e.kind === "calibrated") {
                return {
                    kind: "analysis"
                };
            }
            if (e.kind === "analysis") {
                return {
                    kind: "howto"
                };
            }
            if (e.kind === "howto") {
                return {
                    kind: "stories"
                };
            }
            if (e.kind === "stories") {
                return {
                    kind: "loading"
                };
            }
            if (e.kind === "loading") {
                return {
                    kind: "guarantee"
                };
            }
            e.kind;
            return e;
        });
    }, []);
    let en = n.useCallback(()=>{
        setB((e)=>{
            if (e.kind === "age") {
                return {
                    kind: "question",
                    index: m("duration")
                };
            }
            if (e.kind === "question") {
                if (e.index === m("symptom")) {
                    return e;
                }
                if (e.index === m("duration")) {
                    return {
                        kind: "question",
                        index: m("symptom")
                    };
                }
                if (e.index === m("baking_soda")) {
                    return {
                        kind: "saved"
                    };
                }
                return {
                    kind: "question",
                    index: e.index - 1
                };
            }
            if (e.kind === "saved") {
                return {
                    kind: "age"
                };
            }
            if (e.kind === "confirmed") {
                return {
                    kind: "question",
                    index: m("allergy")
                };
            }
            if (e.kind === "vsl") {
                return {
                    kind: "confirmed"
                };
            }
            if (e.kind === "calibrated") {
                return {
                    kind: "question",
                    index: i.length - 1
                };
            }
            if (e.kind === "analysis") {
                return {
                    kind: "calibrated"
                };
            }
            if (e.kind === "howto") {
                return {
                    kind: "analysis"
                };
            }
            if (e.kind === "stories") {
                return {
                    kind: "howto"
                };
            }
            if (e.kind === "loading") {
                return {
                    kind: "stories"
                };
            }
            if (e.kind === "guarantee") {
                return {
                    kind: "loading"
                };
            }
            return e;
        });
    }, []);
    n.useEffect(()=>{
        if (!(b.kind === "saved" || b.kind === "confirmed" || b.kind === "calibrated")) {
            setR(false);
            return;
        }
        let e = setTimeout(()=>setR(true), 600);
        return ()=>clearTimeout(e);
    }, [
        b.kind
    ]);
    n.useEffect(()=>{
        if (b.kind !== "loading") {
            return;
        }
        let e = Date.now();
        setL(0);
        setW_1(0);
        let t = setInterval(()=>{
            let a = Math.min((Date.now() - e) / 5500 * 100, 100);
            setL(a);
            if (a >= 100) {
                clearInterval(t);
                setTimeout(es, 300);
            }
        }, 50);
        let a = [
            0,
            1,
            2,
            3
        ].map((e)=>setTimeout(()=>setW_1(e + 1), 1000 * e));
        return ()=>{
            clearInterval(t);
            a.forEach(clearTimeout);
        };
    }, [
        b.kind,
        es
    ]);
    n.useEffect(()=>{
        if (!A) {
            return;
        }
        let e = Date.now();
        setL(0);
        let t = setInterval(()=>{
            let a = Math.min((Date.now() - e) / 2500 * 100, 100);
            setL(a);
            if (a >= 100) {
                clearInterval(t);
                setTimeout(()=>{
                    setA(null);
                    es();
                }, 200);
            }
        }, 30);
        return ()=>clearInterval(t);
    }, [
        A
    ]);
    n.useEffect(()=>{
        if (b.kind !== "vsl") {
            return;
        }
        setY(false);
    }, [
        b.kind
    ]);
    let EiComponent = (e)=><div className="mx-auto flex max-w-[440px] flex-col items-center px-6 py-6">{e}</div>;
    let er = b.kind === "question" && b.index === m("symptom")
        ? <span className="h-8 w-8 shrink-0" aria-hidden="true"/>
        : <button type="button" onClick={en} aria-label="Back" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg></button>;
    let eo = <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm"><div className="mx-auto max-w-[440px] px-4 pb-1 pt-2"><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2">{er}<img src="/v2/esquizz/dr/dr-thompson.png" alt="Dr Michael Thompson" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"/><div><div className="flex items-center gap-1"><span className="text-[14px] font-semibold text-[#1a1a1a]" style={{
        letterSpacing: "-0.02em"
    }}>Dr Michael Thompson</span><svg width="12" height="12" viewBox="0 0 24 24" fill="#2a9d6f" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></div><span className="text-[12px] text-[#888]">{Z <= 4 ? "Profile assessment" : Z <= 10 ? "Ingredient check" : Z <= 16 ? "Dose calibration" : "Protocol ready"}</span></div></div><span className="text-[12px] text-[#888]">{Z >= 2 && Z <= 4 ? `${Z - 1}/3` : Z >= 6 && Z <= 9 ? `${Z - 5}/4` : Z >= 12 && Z <= 16 ? `${Z - 11}/5` : ""}</span></div><div className="w-full px-4 py-2"><div className="h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full bg-emerald-500 transition-all duration-500" style={{
        width: `${ee}%`
    }}/></div></div></div></div>;
    if (b.kind === "age") {
        return <div className="min-h-screen bg-white">
            {eo}
            <div className="pt-24">
                {EiComponent(<div className="w-full">
                    <h2 className="mb-1 text-center text-[24px] font-bold leading-tight text-[#1a1a1a]">What is your age range?</h2>
                    <p className="mb-5 text-center text-[13px] leading-relaxed text-[#888]">
                        Just one tap to continue. No exact age needed.
                    </p>
                    <div className="flex flex-col gap-3" role="radiogroup" aria-label="Age range">
                        {r.map((range) => {
                            const selected = k === range;
                            return <button key={range} type="button"
                                aria-pressed={selected}
                                onClick={() => {
                                    setK(range);
                                    setW((answers) => ({ ...answers, age_band: [range] }));
                                    g(4, range);
                                    es();
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl border px-5 py-4 text-left transition-colors duration-150 ${selected ? "border-2 border-[#2a9d6f] bg-[#f0faf5]" : "border-[#e8e8e8] bg-white hover:border-[#2a9d6f] hover:bg-[#f8fbf9]"}`}>
                                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-[#2a9d6f] bg-[#2a9d6f]" : "border-[#ccc]"}`}>
                                    {selected && <span className="text-xs text-white">✓</span>}
                                </span>
                                <span className="flex-1 text-[16px] font-semibold text-[#1a1a1a]">{range}</span>
                                <span className="text-lg text-[#2a9d6f]">›</span>
                            </button>;
                        })}
                    </div>
                </div>)}
            </div>
        </div>;
    }
    let EdComponent = (e, t, a, n)=><div className="min-h-screen bg-white"><Y1Component onBack={en}/><div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-10 pt-16"><div className="mx-auto flex w-full max-w-[440px] flex-col items-center"><div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#2a9d6f] transition-transform duration-300"><span className="text-3xl text-white">✓</span></div><h2 className="mb-1 text-center text-[22px] font-bold text-[#1a1a1a]" style={{
            letterSpacing: "-0.02em"
        }}>{e}</h2><p className="mb-6 text-center text-[13px] text-[#888]">{t}</p><div className={`mb-5 w-full transition-all duration-400 ${R ? "opacity-100" : "opacity-0"}`}><div className="w-full rounded-xl border border-[#e8e8e8] bg-[#f8fbf9] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-[13px] font-semibold text-[#1a1a1a]">📋 Your personalized recipe</span><span className="text-[12px] font-bold text-[#2a9d6f]">{a}%</span></div><div className="mb-3 h-1.5 rounded-full bg-[#e8e8e8]"><div className="h-full rounded-full bg-[#2a9d6f] transition-all duration-700" style={{
            width: R ? `${a}%` : "0%"
        }}/></div><div className="flex flex-col gap-2">{n.map((e, t)=>{
            let a = f[e.status];
            return <div key={e.label} className="flex items-center gap-2 transition-all duration-300" style={{
                opacity: R ? 1 : 0,
                transform: R ? "translateX(0)" : "translateX(-10px)",
                transitionDelay: `${150 * t}ms`
            }}><span className="text-sm">{a.icon}</span><span className="text-[13px] text-[#1a1a1a]">{e.label}</span><span className="ml-auto text-[11px]" style={{
                color: a.color
            }}>— {e.status}</span></div>;
        })}</div></div></div><button type="button" onClick={es} className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#238c5c]">Continue</button></div></div></div>;
    if (b.kind === "saved") {
        return EdComponent("✅ Profile saved", "Checking your ingredients...", 25, [
            {
                label: "Baking soda",
                status: "pending"
            },
            {
                label: "Ingredient 2",
                status: "pending"
            },
            {
                label: "Ingredient 3",
                status: "pending"
            },
            {
                label: "Ingredient 4",
                status: "pending"
            }
        ]);
    }
    if (b.kind === "confirmed") {
        return EdComponent("✅ 3 out of 4 ingredients confirmed", "Your recipe is 75% ready. All that is left is calibrating the doses.", 75, [
            {
                label: "Baking soda",
                status: "confirmed"
            },
            {
                label: "Ingredient 2",
                status: "selected"
            },
            {
                label: "Ingredient 3",
                status: "calibrated"
            },
            {
                label: "Ingredient 4",
                status: "pending"
            }
        ]);
    }
    if (b.kind === "calibrated") {
        return EdComponent("✅ Dose calibrated", "Your personalized protocol is ready.", 90, [
            {
                label: "Baking soda",
                status: "confirmed"
            },
            {
                label: "Ingredient 2",
                status: "selected"
            },
            {
                label: "Ingredient 3",
                status: "calibrated"
            },
            {
                label: "Ingredient 4 + doses",
                status: "pending"
            }
        ]);
    }
    if (b.kind === "vsl") {
        return <div className="min-h-screen bg-white"><div className="pt-4">{EiComponent(<><TD/><h2 className="mt-4 text-center text-[22px] font-bold leading-tight text-[#1a1a1a]">Watch this video before you continue</h2><p className="mb-4 mt-1 text-center text-[13px] text-[#888]">The specialist explains exactly how it works.</p><div className="mb-3 w-full"><o.c variant="quiz" onTimeUpdate={(seconds) => {
            if (seconds >= W7.quiz.delay) setY(true);
        }}/></div>{Y && <button type="button" onClick={es} className="mt-3 w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white">Continue</button>}</>)}</div></div>;
    }
    if (b.kind === "analysis") {
        return <div className="min-h-screen bg-white"><Y1Component onBack={en}/><div className="pb-28 pt-6">{EiComponent(<><TD/><h2 className="mb-4 mt-4 text-center text-[24px] font-bold text-[#1a1a1a]">Your analysis result</h2><p className="mb-1 text-[13px] text-[#888]">Vascular blockage level</p><p className="mb-4 text-[48px] font-extrabold text-[#c62828]">7.4</p><div className="mb-5 w-full rounded-xl border border-[#ffcdd2] bg-[#fff5f5] p-5"><span className="mb-3 inline-block rounded-full bg-[#c62828] px-3 py-1 text-[12px] font-bold text-white">🔴 MODERATE TO HIGH BLOCKAGE</span><p className="mb-2 text-[14px] text-[#1a1a1a]">Based on your answers, we see signs of significant vascular blockage caused by crystallized deposits.</p><p className="mb-3 text-[14px] text-[#1a1a1a]">Your symptoms match a 60% to 89% blockage of blood flow to the penis.</p><p className="text-[14px] font-semibold text-[#2a9d6f]">💡 With the right protocol you can start dissolving those deposits and get your erections back within the first few days.</p></div><div className="mb-5 w-full rounded-xl border-2 border-[#2a9d6f] bg-[#f8fbf9] p-5"><div className="mb-3 flex items-center gap-2"><span className="text-lg">📋</span><h3 className="text-[16px] font-bold text-[#1a1a1a]">Your personalized recipe</h3></div><div className="mb-3 flex flex-col gap-2.5">{[
            {
                icon: "✅",
                label: "Baking soda",
                tag: "— confirmed",
                dim: false
            },
            {
                icon: "✅",
                label: "Ingredient 2",
                tag: "— selected",
                dim: false
            },
            {
                icon: "✅",
                label: "Ingredient 3",
                tag: "— calibrated",
                dim: false
            },
            {
                icon: "🔒",
                label: "Ingredient 4",
                tag: "— pending",
                dim: true
            },
            {
                icon: "🔒",
                label: "Exact doses",
                tag: "— pending",
                dim: true
            }
        ].map((e)=><div key={e.label} className={`flex items-center gap-2 ${e.dim ? "opacity-60" : ""}`}><span className="text-sm">{e.icon}</span><span className={`text-[14px] font-medium ${e.dim ? "text-[#888]" : "text-[#1a1a1a]"}`}>{e.label}</span><span className={`ml-auto text-[11px] ${e.dim ? "text-[#aaa]" : "text-[#2a9d6f]"}`}>{e.tag}</span></div>)}</div><p className="text-center text-[13px] italic text-[#555]">To unlock the remaining ingredients and the exact doses, get the complete protocol.</p></div><p className="mb-3 text-[16px] font-bold text-[#1a1a1a]">The benefits of the baking soda trick 🧪</p><div className="mb-5 w-full space-y-2">{[
            "100% natural homemade recipe",
            "Clears the blockages from the inside",
            "Improves blood flow to the intimate area",
            "Hard, long-lasting results",
            "Visible improvement in size",
            "No contraindications",
            "Quick to prepare at home"
        ].map((e)=><div key={e} className="flex items-center gap-2 rounded-lg bg-[#f0faf5] px-4 py-3"><span className="text-[#2a9d6f]">✅</span><span className="text-[14px] text-[#1a1a1a]">{e}</span></div>)}</div><div className="mb-5 w-full rounded-xl border border-[#e8e8e8] p-5"><A8 className="mb-2 text-sm"/><p className="mb-2 text-[14px] italic text-[#1a1a1a]">"In 5 days I got morning erections back like I was 20"</p><p className="text-[13px] text-[#888]">Richard, 54 — Tampa</p></div></>)}</div><V1Component onClick={es} label="Continue"/></div>;
    }
    if (b.kind === "howto") {
        return <div className="min-h-screen bg-white"><Y1Component onBack={en}/><div className="pt-10">{EiComponent(<><h2 className="mb-1 text-center text-[24px] font-bold text-[#1a1a1a]">How to use the baking soda trick</h2><p className="mb-6 text-center text-[15px] text-[#555]">Simple, fast and effective</p><div className="mb-6 w-full space-y-3">{[
            [
                "Prepare the mix",
                "A simple recipe from your protocol"
            ],
            [
                "Drink it once a day",
                "In the morning or before bed"
            ],
            [
                "Follow it for 30 days",
                "The complete protocol"
            ]
        ].map(([a, n], t)=><div key={a} className="flex items-start gap-3 rounded-xl border border-[#e8e8e8] bg-[#f8faf8] p-3.5"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2a9d6f] text-sm font-bold text-white">{t + 1}</div><div><p className="text-[14px] font-bold text-[#1a1a1a]">{a}</p><p className="text-[13px] text-[#888]">{n}</p></div></div>)}</div><div className="mb-6 flex w-full gap-2">{[
            "Once a day",
            "Easy to prepare",
            "100% natural recipe"
        ].map((e)=><div key={e} className="flex flex-1 items-center gap-1.5 rounded-lg border border-[#d4edda] bg-[#f0faf5] px-3 py-2.5"><span className="shrink-0 text-[#2a9d6f]">✅</span><span className="text-[12px] font-semibold leading-tight text-[#1a1a1a]">{e}</span></div>)}</div><button type="button" onClick={es} className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white">✅ Yes, I'm committed</button></>)}</div></div>;
    }
    if (b.kind === "stories") {
        return <div className="min-h-screen bg-white"><Y1Component onBack={en}/><div className="pb-28 pt-12">{EiComponent(<><h2 className="mb-1 text-center text-[24px] font-bold text-[#1a1a1a]">Transformation stories</h2><p className="mb-5 text-center text-[15px] text-[#555]">See what real men achieved with the baking soda trick</p><div className="mb-6 w-full space-y-3">{[
            [
                "/v2/esquizz/assets/t-james.jpg",
                "James, 57",
                "Dallas",
                "In 4 days my morning erections were back. My wife couldn't believe it."
            ],
            [
                "/v2/esquizz/assets/t-steve.jpg",
                "Steve, 56",
                "Phoenix",
                "I spent $700 on Viagra. The baking soda cost me $2 and works better."
            ],
            [
                "/v2/esquizz/assets/t-michael.jpg",
                "Michael, 63",
                "Denver",
                "The urologist said it was normal at my age. Now I have sex 3 times a week."
            ],
            [
                "/v2/esquizz/assets/t-paul.jpg",
                "Paul, 61",
                "Atlanta",
                "My wife asked what had gotten into me. For 2 months we can't stop."
            ]
        ].map(([src, a, n, l])=><div key={a} className="rounded-xl border border-[#e8e8e8] p-5"><div className="mb-3 flex items-center gap-3"><img src={src} alt={a} width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full border border-[#e8e8e8] object-cover"/><div className="flex-1"><p className="text-[13px] font-semibold text-[#1a1a1a]">{a}</p><p className="text-[12px] text-[#888]">{n}</p></div><A8/></div><p className="text-[14px] font-semibold italic text-[#1a1a1a]">"{l}"</p></div>)}</div></>)}</div><V1Component onClick={es} label="I want my protocol ⚡"/></div>;
    }
    if (b.kind === "loading") {
        let strokeDasharray = 2 * Math.PI * 50;
        return <div className="min-h-[60vh] bg-white"><div className="mx-auto flex min-h-[60vh] max-w-[440px] flex-col items-center justify-center px-6"><div className="relative mb-8 h-[140px] w-[140px]"><svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90"><circle cx="70" cy="70" r={50} fill="none" stroke="#e8e8e8" strokeWidth="4"/><circle cx="70" cy="70" r={50} fill="none" stroke="#2a9d6f" strokeWidth="4" strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDasharray - L / 100 * strokeDasharray} className="transition-all duration-100 ease-linear"/></svg><div className="absolute inset-0 flex items-center justify-center"><span className="text-[24px] font-bold text-[#1a1a1a]">{Math.round(L)}%</span></div></div><div className="flex w-full flex-col gap-2">{[
            "Checking your data...",
            "Evaluating your levels...",
            "Setting your personalized doses...",
            "Finalizing your protocol..."
        ].map((e, t)=><div key={e} className="text-center text-[14px] transition-all duration-500" style={{
                opacity: t < W ? 1 : 0,
                transform: t < W ? "translateY(0)" : "translateY(8px)",
                color: t === W - 1 ? "#2a9d6f" : "#888",
                fontWeight: t === W - 1 ? 600 : 400
            }}>{e}</div>)}</div></div></div>;
    }
    if (b.kind === "guarantee") {
        return <div className="min-h-screen bg-white px-5 py-5"><div className="mx-auto w-full max-w-[430px]"><div className="border-b border-[#e5e7eb] pb-4"><div className="flex items-center gap-2"><img src="/v2/esquizz/dr/dr-thompson.png" alt="Dr Michael Thompson" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"/><div><p className="text-xs font-semibold text-gray-800">Dr Michael Thompson</p><p className="text-[10px] text-emerald-600">Certified protocol</p></div></div></div><section className="pt-6"><p className="mb-2 text-xs font-bold uppercase text-[#2a9d6f]">Your protection</p><h1 className="text-[32px] font-extrabold leading-[1.06] text-[#1f252e]">Try Vireon <span className="text-[#2a9d6f]">risk-free</span></h1><p className="mt-3 text-base font-medium leading-relaxed text-[#64748b]">If the protocol is not right for you, request a full refund within 30 days. No complicated process.</p><button type="button" aria-label="Activate 30-day guarantee" aria-pressed={M} onClick={()=>setM((e)=>!e)} className="mx-auto mt-8 flex h-44 w-44 flex-col items-center justify-center rounded-full border-[6px] border-double border-[#2a9d6f]/30 bg-[#2a9d6f]/5 text-[#2a9d6f] transition-transform active:scale-95"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mb-1"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg><span className="text-[29px] font-black leading-none">30-DAY</span><span className="mt-1 text-[10px] font-bold uppercase">Money-back guarantee</span></button><p className="mt-3 text-center text-[11px] font-bold uppercase text-[#64748b]">Tap the seal to activate</p><div className="mt-6 space-y-3">{[
            "30 days to explore the complete protocol",
            "A simple refund request if it is not for you"
        ].map((e)=><div key={e} className="flex items-start gap-3 text-sm font-semibold text-[#1f252e]"><span className="text-[#2a9d6f]">✔</span><span>{e}</span></div>)}</div><button type="button" role="switch" aria-checked={M} onClick={()=>setM((e)=>!e)} className="mt-6 flex min-h-[88px] w-full items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 text-left shadow-sm"><span className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${M ? "bg-[#2a9d6f]" : "bg-[#e5e7eb]"}`}><span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${M ? "translate-x-7" : "translate-x-1"}`}/></span><span><span className="block text-sm font-bold text-[#1f252e]">Activate my 30-day money-back guarantee</span><span className="mt-1 block text-xs text-[#64748b]">Your protection is included with either plan.</span></span></button><button type="button" onClick={ea} disabled={!M} className="mt-5 h-14 w-full rounded-xl bg-[#1f3a2e] text-base font-bold text-white disabled:opacity-50">See my final recommendation →</button>{!M && <p className="mt-3 text-center text-xs font-semibold text-[#64748b]">Activate your guarantee to continue</p>}</section></div></div>;
    }
    return <div className="min-h-screen bg-white">{eo}<div className="pt-24">{EiComponent(<div className="w-full"><h2 className="mb-1 text-center text-[24px] font-bold leading-tight text-[#1a1a1a]">{Q?.title}</h2><p className="mb-5 text-center text-[13px] leading-relaxed text-[#888]">{Q?.help}</p><div className="mt-5 flex flex-col gap-2.5" role={Q?.multiple ? "group" : "radiogroup"}>{Q == null ? undefined : Q.options.map((e, t)=>{
        let n = J.includes(e);
        return <button key={e} type="button" onClick={()=>((e)=>{
                if (!Q) {
                    return;
                }
                let a = w[Q.id] ?? [];
                if (Q.multiple) {
                    let t = a.includes(e) ? a.filter((t)=>t !== e) : [
                        ...a,
                        e
                    ];
                    setW((e)=>({
                            ...e,
                            [Q.id]: t
                        }));
                    g(Z, t);
                    return;
                }
                setW((t)=>({
                        ...t,
                        [Q.id]: [
                            e
                        ]
                    }));
                g(Z, e);
                if (Q.id === "symptom") {
                    window.vireonTrack?.("quiz_start", "first_answer");
                }
                if (Q.id === "water") {
                    setA({
                        icon: "💧",
                        message: "Calibrating the liquid proportions in your formula..."
                    });
                    return;
                }
                setTimeout(es, Q.id === "symptom" || Q.id === "duration" ? 200 : 500);
            })(e)} aria-pressed={n} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${n ? "border-2 border-[#2a9d6f] bg-[#f0faf5]" : "border-[#e8e8e8] hover:border-[#2a9d6f] hover:bg-[#f8fbf9]"}`} style={{
            padding: "16px 20px"
        }}><span className={`grid h-5 w-5 shrink-0 place-items-center ${Q.multiple ? "rounded-sm" : "rounded-full"} border-2 ${n ? "border-[#2a9d6f] bg-[#2a9d6f]" : "border-[#ccc]"}`}>{n && <span className="text-xs text-white">✓</span>}</span><span className="flex-1 text-[15px] font-medium text-[#1a1a1a]">{Q.emojis?.[t] ? `${Q.emojis[t]} ` : ""}{e}</span>{Q.id === "duration" && <span className="shrink-0 text-lg text-[#ccc]">›</span>}</button>;
    })}</div>{Q?.multiple && <button type="button" onClick={es} disabled={J.length === 0} className={`mt-5 w-full rounded-xl py-3.5 text-[16px] font-semibold text-white transition-colors duration-200 ${J.length === 0 ? "cursor-not-allowed bg-[#e8e8e8]" : "bg-[#2a9d6f] hover:bg-[#238c5c]"}`}>Continue</button>}</div>)}</div>{A && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"><div className="mx-6 w-full max-w-[340px] rounded-2xl bg-white p-6 shadow-xl"><div className="flex flex-col items-center"><span className="mb-3 text-4xl">{A.icon}</span><p className="mb-4 text-center text-[14px] font-medium text-[#1a1a1a]">{A.message}</p><div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8e8e8]"><div className="h-full rounded-full bg-[#2a9d6f] transition-all duration-100 ease-linear" style={{
        width: `${L}%`
    }}/></div></div></div></div>}</div>;
}
function Y1Component({ onBack, percent = 100 }) {
    return <><div className="fixed inset-x-0 top-0 z-50"><div className="h-1 rounded-sm bg-[#e8e8e8]"><div className="h-full rounded-sm bg-[#2a9d6f] transition-all duration-300 ease-in-out" style={{
        width: `${percent}%`
    }}/></div></div><button type="button" onClick={onBack} className="fixed left-3 top-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md" aria-label="Back"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg></button></>;
}
function V1Component({ onClick, label, disabled }) {
    return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e8e8e8] bg-white px-6 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]"><div className="mx-auto max-w-[440px]"><button type="button" onClick={onClick} disabled={disabled} className="w-full rounded-xl bg-[#2a9d6f] py-3.5 text-[16px] font-semibold text-white transition-colors hover:bg-[#238c5c] disabled:opacity-50">{label}</button></div></div>;
}
