// @ts-nocheck
/* eslint-disable */
import * as i from "./module-4439.jsx";
import { TD } from "./module-7439.jsx";
import { $b, W7, ze } from "./module-2523.jsx";
import { fv } from "./module-6885.jsx";
import { d } from "./module-6171.jsx";

import * as r from "react";
let c = "vireon_backredirect";
let p = [
    "Your complete personalized Vireon protocol",
    "Step-by-step recipe and preparation guide",
    "Daily action plan and progress tracker",
    "Private app access on any device"
];
let m = [
    {
        img: "bonus-last-longer.jpg",
        price: 47,
        title: "Last Longer",
        text: "Control method without creams or numbing products"
    },
    {
        img: "bonus-positions.jpg",
        price: 39,
        title: "Maximum Stimulation Positions",
        text: "More sensation with less performance pressure"
    },
    {
        img: "bonus-progression.jpg",
        price: 57,
        title: "Progression Exercises",
        text: "A guided 6-minute daily routine"
    },
    {
        img: "bonus-testosterone.jpg",
        price: 47,
        title: "Testosterone & Desire",
        text: "Daily habits that support energy and drive"
    },
    {
        img: "bonus-21-day.jpg",
        price: 37,
        title: "21-Day Challenge",
        text: "A daily calendar designed for consistency"
    },
    {
        img: "bonus-discretion.jpg",
        price: 29,
        title: "Total Discretion Kit",
        text: "A simple, private routine with no deliveries"
    },
    {
        img: "bonus-private-group.jpg",
        price: 97,
        title: "Private Men's Group",
        text: "A discreet members-only community"
    },
    {
        img: "bonus-message-support.jpg",
        price: 147,
        title: "30-Day Message Support",
        text: "Personal guidance for your questions for 30 days"
    }
];
let h = [
    {
        file: "01_whatsapp_monique.jpg",
        name: "Monique",
        app: "WhatsApp"
    },
    {
        file: "06_instagram_linda.jpg",
        name: "Linda",
        app: "Instagram"
    },
    {
        file: "07_messenger_mark.jpg",
        name: "Mark",
        app: "Messenger"
    },
    {
        file: "02_whatsapp_jacques.jpg",
        name: "Jacques",
        app: "WhatsApp"
    },
    {
        file: "09_instagram_diane.jpg",
        name: "Diane",
        app: "Instagram"
    },
    {
        file: "10_messenger_carol.jpg",
        name: "Carol",
        app: "Messenger"
    },
    {
        file: "03_whatsapp_helen.jpg",
        name: "Helen",
        app: "WhatsApp"
    },
    {
        file: "12_instagram_elaine.jpg",
        name: "Elaine",
        app: "Instagram"
    },
    {
        file: "13_messenger_denise.jpg",
        name: "Denise",
        app: "Messenger"
    },
    {
        file: "08_whatsapp_sofia.jpg",
        name: "Sofia",
        app: "WhatsApp"
    },
    {
        file: "15_instagram_susan.jpg",
        name: "Susan",
        app: "Instagram"
    },
    {
        file: "16_messenger_margaret.jpg",
        name: "Margaret",
        app: "Messenger"
    },
    {
        file: "04_whatsapp_robert.jpg",
        name: "Robert",
        app: "WhatsApp"
    },
    {
        file: "18_instagram_claire.jpg",
        name: "Claire",
        app: "Instagram"
    },
    {
        file: "19_messenger_george.jpg",
        name: "George",
        app: "Messenger"
    },
    {
        file: "05_whatsapp_patricia.jpg",
        name: "Patricia",
        app: "WhatsApp"
    },
    {
        file: "11_whatsapp_thomas.jpg",
        name: "Thomas",
        app: "WhatsApp"
    },
    {
        file: "14_whatsapp_paul.jpg",
        name: "Paul",
        app: "WhatsApp"
    },
    {
        file: "17_whatsapp_andrew.jpg",
        name: "Andrew",
        app: "WhatsApp"
    },
    {
        file: "20_whatsapp_natalie.jpg",
        name: "Natalie",
        app: "WhatsApp"
    }
];
let u = [
    [
        "How do I receive my plan?",
        "Access is digital. Your instructions are sent after payment so you can begin without waiting for shipping."
    ],
    [
        "Is this a subscription?",
        "No. Both options are one-time payments with no recurring charges."
    ],
    [
        "What is included?",
        "Essential includes the complete Vireon protocol, preparation guide, daily action plan, progress tracker, and private app access. Complete includes everything in Essential plus all eight digital bonuses."
    ],
    [
        "What does the guarantee cover?",
        "You have 30 days to explore the program. If it is not right for you, request a refund under the checkout provider's guarantee terms."
    ]
];
let x = {
    2: "age_weight",
    3: "symptom",
    4: "duration",
    12: "tried",
    13: "goal",
    14: "sleep",
    15: "water",
    16: "routine"
};
let g = (e, t)=>{
    let s = e[t];
    if (Array.isArray(s)) {
        return s.join(", ");
    }
    return s ?? "";
};
let f = {
    age_weight: "Age & weight",
    symptom: "Current concern",
    duration: "How long",
    goal: "Primary goal",
    sleep: "Nightly sleep",
    water: "Daily hydration",
    routine: "Daily routine"
};
export function Offer() {
    let { externo } = fv();
    let [t, setT] = r.useState(false);
    let [b, setB] = r.useState(0);
    let [w, setW] = r.useState(null);
    let [v, setV] = r.useState({});
    let [k, setK] = r.useState(false);
    let CRef = r.useRef(null);
    let zRef = r.useRef(null);
    let SRef = r.useRef(null);
    r.useEffect(()=>{
        if (!t) {
            return;
        }
        let e = false;
        let s = ()=>{
            if (e) {
                e = false;
                try {
                    sessionStorage.setItem(c, "1");
                } catch (e) {}
                window.location.href = `/backredirect${window.location.search}${window.location.hash}`;
            }
        };
        let a = ()=>{
            try {
                sessionStorage.removeItem(c);
            } catch (e) {}
            if (!e) {
                e = true;
                try {
                    history.pushState({
                        vireonBack: 1
                    }, "", window.location.href);
                } catch (e) {}
            }
        };
        window.addEventListener("popstate", s);
        a();
        let r = window.setTimeout(a, 400);
        let i = window.setTimeout(a, 1200);
        return ()=>{
            window.removeEventListener("popstate", s);
            window.clearTimeout(r);
            window.clearTimeout(i);
        };
    }, [
        t
    ]);
    r.useEffect(()=>{
        try {
            let e = document.cookie.split(";").some((e)=>e.trim() === "vireon_pitch=1");
            setV((()=>{
                let e = {};
                try {
                    let r = localStorage.getItem("esquiz_quiz_answers") ?? sessionStorage.getItem("vireon_answers") ?? "{}";
                    let i = JSON.parse(r);
                    for (let [t, s] of Object.entries(i)){
                        e[x[t] ?? t] = s;
                    }
                } catch (e) {}
                return e;
            })());
            setK(true);
            let t = ()=>{
                setT(true);
                document.cookie = "vireon_pitch=1; path=/; max-age=2592000; SameSite=Lax";
                window.setTimeout(()=>{
                    SRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 150);
            };
            if (e) {
                t();
                return;
            }
            let a = window.setTimeout(t, 1000 * W7.offer.delay);
            return ()=>window.clearTimeout(a);
        } catch (e) {
            setT(true);
            setK(true);
            return;
        }
    }, []);
    let M = r.useMemo(()=>{
        if (Object.keys(v).length) {
            return ((e)=>{
                let t = g(e, "symptom").toLowerCase();
                let s = g(e, "duration");
                let a = g(e, "tried").toLowerCase();
                let r = g(e, "goal").toLowerCase();
                let i = g(e, "sleep");
                let n = g(e, "water");
                let l = g(e, "routine").toLowerCase();
                let o = r.includes("all of the above") || t.includes(",") ? "Erection quality, staying power and sexual confidence" : r.includes("size") || t.includes("size or girth") ? "Firmness, perceived fullness and sexual confidence" : r.includes("last longer") || t.includes("before finishing") ? "Erection stability and staying power" : t.includes("less desire") ? "Desire, energy and sexual confidence" : "Erection firmness and reliable performance";
                let c = a.includes("nothing") || !a ? "without a previous structured approach" : "after trying other approaches";
                let d = s.includes("Less than 6 months") ? `Recent changes, ${c}` : s.includes("6 months to 2 years") ? `Persistent changes for up to 2 years, ${c}` : s.includes("2 to 5 years") ? `Established pattern for 2–5 years, ${c}` : s.includes("More than 5 years") ? `Long-standing pattern of more than 5 years, ${c}` : "Assessment completed from your reported symptoms";
                let p = r.includes("all of the above") ? "Build a more complete sexual-performance routine" : r.includes("size") ? "Support firmness, fullness and confidence" : r.includes("last longer") ? "Improve control and maintain performance longer" : "Support stronger, longer-lasting erections";
                let m = l.includes("outside") || l.includes("student") ? "Simple morning or evening routine" : l.includes("retired") ? "Flexible daily routine" : "At-home daily routine";
                let h = i.includes("Less than 5") || i.includes("5 to 7") ? "with added sleep consistency" : "aligned with your current sleep schedule";
                let u = n ? n.includes("Almost none") || n.includes("Less than") ? "Gradual hydration increase built into the routine" : "Maintain your current hydration as part of the routine" : "Hydration guidance included";
                return [
                    {
                        label: "Profile",
                        value: g(e, "age_weight")
                    },
                    {
                        label: "Focus area",
                        value: o
                    },
                    {
                        label: "Current stage",
                        value: d
                    },
                    {
                        label: "Primary objective",
                        value: p
                    },
                    {
                        label: "Daily approach",
                        value: `${m}, ${h}`
                    },
                    {
                        label: "Hydration strategy",
                        value: u
                    }
                ].filter((e)=>e.value);
            })(v);
        }
        return Object.entries(f).map(([t, label])=>({
                label,
                value: g(v, t)
            })).filter((e)=>e.value).slice(0, 6);
    }, [
        v
    ]);
    let W = r.useCallback((e)=>{
        setB((t)=>{
            let r = Math.min(h.length - 1, Math.max(0, t + e));
            CRef.current?.children.item(r)?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
            return r;
        });
    }, []);
    let onScroll = r.useCallback(()=>{
        if (zRef.current !== null) {
            window.clearTimeout(zRef.current);
        }
        zRef.current = window.setTimeout(()=>{
            let CRef_current = CRef.current;
            if (!CRef_current) {
                return;
            }
            let t = CRef_current.scrollLeft + CRef_current.clientWidth / 2;
            let s = Array.from(CRef_current.children);
            setB(s.reduce((acc, item, index)=>{
                if (Math.abs(item.offsetLeft + item.offsetWidth / 2 - t) < Math.abs((s[acc] ? s[acc].offsetLeft + s[acc].offsetWidth / 2 : 0) - t)) {
                    return index;
                }
                return acc;
            }, 0));
        }, 160);
    }, []);
    let A = "flex min-h-[56px] w-full items-center justify-center rounded-xl px-5 text-center text-sm font-extrabold transition-transform active:scale-[0.98]";
    if (t) {
        return <div ref={SRef} data-testid="sales-root" className="animate-fade-in w-full bg-white text-[#1f252e]"><div className="pt-4"><div className="mx-auto flex max-w-[440px] flex-col items-center px-6 py-6"><TD/><h2 className="mb-1 mt-4 text-center text-[22px] font-bold leading-tight text-[#1a1a1a]">Your protocol is ready</h2><p className="mb-4 mt-1 text-center text-[13px] text-[#888]">The specialist has one last message for you.</p><div className="mb-3 w-full"><i.c variant="offer"/></div></div></div><section className="px-5 py-12"><div className="mx-auto max-w-[760px]"><p className="text-center text-xs font-extrabold uppercase text-[#36d399]">Choose your Vireon access</p><h2 className="mt-2 text-center text-[28px] font-black">Start with the option that fits you</h2><p className="mx-auto mt-3 max-w-[540px] text-center text-sm text-[#67717e]">Both options include your personalized protocol and private digital access.</p><article className="relative mx-auto mt-8 max-w-[680px] overflow-hidden rounded-lg border-2 border-[#153324] bg-[#153324] p-6 text-white shadow-xl"><div className="absolute right-0 top-0 rounded-bl-lg bg-[#36d399] px-4 py-2 text-[10px] font-black uppercase text-white">Best value · 8 bonuses</div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-4 h-7 w-7 text-[#36d399]"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg><h3 className="text-2xl font-black">Vireon Complete</h3><p className="mt-1 text-sm opacity-75">The full protocol, guidance and complete bonus library</p><div className="my-6 flex items-end gap-2"><span className="text-5xl font-black">{d(ze.complete.charged)}</span><span className="pb-1 text-xs opacity-70">one-time</span></div><ul className="space-y-3">{p.map((e)=><li key={e} className="flex gap-3 text-sm"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 h-4 w-4 shrink-0 text-[#36d399]"><path d="M20 6 9 17l-5-5"/></svg><span>{e}</span></li>)}</ul><div className="mt-6 border-y border-white/20 py-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#36d399] text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg></span><div><p className="text-sm font-black uppercase">Complete 8-bonus pack included</p><p className="mt-1 text-xs opacity-70"><span className="line-through">$500 total value</span> · Included for $0</p></div></div><div className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">{m.map((e, t)=><div key={e.title} className="flex items-center gap-3"><img src={`/v2/esquizz/assets/${e.img}`} alt={`${e.title} digital bonus guide`} loading="lazy" width={80} height={80} className="h-20 w-20 shrink-0 rounded object-cover"/><div className="min-w-0"><p className="text-[10px] font-black uppercase text-[#36d399]">Bonus {t + 1} · <span className="line-through opacity-70">${e.price}</span> $0</p><p className="mt-1 text-sm font-extrabold leading-tight">{e.title}</p><p className="mt-1 text-xs leading-snug opacity-70">{e.text}</p></div></div>)}</div></div><div className="mt-6"><a href={externo($b.complete)} className={`${A} border border-[#dce0e5] bg-white text-[#1f252e]`}>Get Complete + 8 Bonuses →</a></div></article><article className="mx-auto mt-4 max-w-[680px] rounded-lg border border-[#dce0e5] bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase text-[#36d399]">Essential access</p><h3 className="mt-1 text-xl font-black">Vireon Essential</h3><p className="mt-1 text-sm text-[#67717e]">Your protocol and core tools, without the bonus library</p></div><div className="text-right"><span className="text-3xl font-black">{d(ze.essential.charged)}</span><p className="text-[10px] font-semibold text-[#67717e]">one-time</p></div></div><ul className="mt-5 grid gap-3 sm:grid-cols-2">{p.map((e)=><li key={e} className="flex gap-3 text-sm"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mt-0.5 h-4 w-4 shrink-0 text-[#36d399]"><path d="M20 6 9 17l-5-5"/></svg><span>{e}</span></li>)}</ul><div className="mt-6"><a href={externo($b.essential)} className={`${A} bg-[#153324] text-white shadow-lg`}>Get Essential Access →</a></div></article><div className="mt-5 flex items-center justify-center gap-4 text-[11px] font-semibold text-[#67717e]"><span className="flex items-center gap-1"><svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>Secure checkout</span><span className="flex items-center gap-1"><svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>30-day guarantee</span></div></div></section><section className="border-y border-[#153324]/80 bg-[#153324] px-5 py-10 text-white"><div className="mx-auto max-w-[680px]"><div className="flex items-center gap-3"><img src="/v2/esquizz/assets/logo-vireon.png" alt="Vireon masculine performance logo" width={56} height={56} className="h-14 w-14 shrink-0 object-contain"/><div className="flex items-center gap-2 rounded bg-[#36d399] px-3 py-2 text-[10px] font-black uppercase text-white"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>Protocol assessment</div></div><h2 className="mt-6 text-[32px] font-black leading-none">Your Vireon Protocol is ready.</h2><p className="mt-3 max-w-[540px] text-sm opacity-80">Your recommendation was organized around the answers you shared during your private consultation.</p><div className="mt-7 border border-white/20 bg-white/5 px-5 py-2 text-left">{k && (M.length ? M.map((e)=><div key={e.label} className="border-b border-white/15 py-4 last:border-b-0"><p className="text-[10px] font-black uppercase text-[#36d399]">{e.label}</p><p className="mt-1 text-[17px] font-extrabold leading-snug">{e.value}</p></div>) : <div className="py-5"><p className="text-[10px] font-black uppercase text-[#36d399]">Status</p><p className="mt-1 text-[17px] font-extrabold">Personalized protocol prepared</p></div>)}</div><p className="mt-4 text-xs opacity-60">Your answers guide the educational content shown in your protocol. Individual results vary.</p></div></section><section className="border-y border-[#dce0e5] bg-[#f1f5f9]/50 px-5 py-12"><div className="mx-auto max-w-[760px]"><div className="flex items-center justify-center gap-2 text-[#36d399]"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6.2 6.8.9-5 4.7 1.3 6.7L12 17.8 6 21l1.3-6.7-5-4.7 6.8-.9z"/></svg><span className="text-xs font-extrabold uppercase">What Vireon customers are saying</span></div><h2 className="mt-3 text-center text-[27px] font-black">What Our Customers Are Saying</h2><p className="mx-auto mt-3 max-w-[520px] text-center text-sm text-[#67717e]">See what customers are sharing about their experience with Vireon.</p><div ref={CRef} onScroll={onScroll} className="mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{h.map((e)=><figure key={e.file} className="min-w-[86%] snap-center overflow-hidden rounded-lg border border-[#dce0e5] bg-white sm:min-w-[48%]"><img src={`/v2/esquizz/proof/${e.file}`} alt={`${e.app} customer conversation with ${e.name}`} loading="lazy" className="h-auto w-full"/></figure>)}</div><div className="mt-3 flex items-center justify-center gap-4"><button type="button" aria-label="Previous review" onClick={()=>W(-1)} disabled={b === 0} className="flex h-11 w-11 min-h-0 min-w-0 items-center justify-center rounded-full border border-[#dce0e5] bg-white text-lg disabled:opacity-30">‹</button><span className="min-w-12 text-center text-xs font-bold text-[#67717e]">{b + 1} / {h.length}</span><button type="button" aria-label="Next review" onClick={()=>W(1)} disabled={b === h.length - 1} className="flex h-11 w-11 min-h-0 min-w-0 items-center justify-center rounded-full border border-[#dce0e5] bg-white text-lg disabled:opacity-30">›</button></div></div></section><section className="px-5 py-12"><div className="mx-auto max-w-[760px]"><p className="text-center text-xs font-extrabold uppercase text-[#36d399]">Inside Vireon</p><h2 className="mt-2 text-center text-[27px] font-black">Everything organized in one private place</h2><div className="mt-7 grid gap-4 md:grid-cols-2"><img src="/v2/esquizz/assets/app-dashboard.png" alt="Vireon personalized protocol dashboard" loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full rounded-lg object-cover"/><img src="/v2/esquizz/assets/system.png" alt="Complete Vireon digital system" loading="lazy" width={1536} height={1024} className="aspect-[3/2] w-full rounded-lg object-cover"/></div></div></section><section className="border-y border-[#dce0e5] bg-[#f1f5f9]/40 px-5 py-12"><div className="mx-auto max-w-[680px] text-center"><img src="/v2/esquizz/assets/seal-30.png" alt="30-day money-back guarantee" className="mx-auto h-36 w-36 object-contain"/><h2 className="mt-3 text-[27px] font-black">Your 30-day protection is active</h2><p className="mx-auto mt-3 max-w-[500px] text-sm text-[#67717e]">Take time to explore the material. If Vireon is not right for you, request a refund within 30 days under the guarantee terms.</p></div></section><section className="px-5 py-12"><div className="mx-auto max-w-[680px]"><h2 className="mb-6 text-center text-[27px] font-black">Questions before you begin</h2><div className="space-y-2">{u.map(([s, r], t)=><div key={s} className="overflow-hidden rounded-lg border border-[#dce0e5] bg-white"><button type="button" onClick={()=>setW(w === t ? null : t)} className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-bold">{s}<span className={`shrink-0 transition-transform ${w === t ? "rotate-180" : ""}`}>▾</span></button>{w === t && <p className="px-4 pb-4 text-sm text-[#67717e]">{r}</p>}</div>)}</div></div></section><section className="bg-[#153324] px-5 py-12 text-white"><div className="mx-auto max-w-[560px] text-center"><p className="text-xs font-extrabold uppercase text-[#36d399]">Choose your access</p><h2 className="mt-3 text-[30px] font-black">Start your Vireon protocol today</h2><p className="mt-3 text-sm opacity-75">Choose Complete with all eight bonuses, or Essential with the core protocol.</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><a href={externo($b.complete)} className={`${A} border border-[#dce0e5] bg-white text-[#1f252e]`}>Complete · {d(ze.complete.charged)} →</a><a href={externo($b.essential)} className={`${A} border border-[#dce0e5] bg-white text-[#1f252e]`}>Essential · {d(ze.essential.charged)} →</a></div><p className="mt-4 text-[10px] opacity-60">This educational program is not a substitute for professional medical advice. Results vary.</p></div></section></div>;
    }
    return <div className="min-h-screen bg-white pt-4"><div className="mx-auto flex max-w-[440px] flex-col items-center px-6 py-6"><TD/><h2 className="mb-1 mt-4 text-center text-[22px] font-bold leading-tight text-[#1a1a1a]">Your protocol is ready</h2><p className="mb-4 mt-1 text-center text-[13px] text-[#888]">The specialist has one last message for you.</p><div className="mb-3 w-full"><i.c variant="offer"/></div></div></div>;
}
