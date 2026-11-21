// @ts-nocheck
/* eslint-disable */
import * as a from "react";
import * as s from "./module-4230.jsx";
import * as n from "./module-240.jsx";
import * as l from "./module-5751.jsx";
let r = {
    people: "vireon.admin.people",
    invites: "vireon.admin.invites",
    library: "vireon.admin.library",
    programs: "vireon.admin.programs",
    notices: "vireon.admin.notices",
    outbox: "vireon.admin.outbox",
    settings: "vireon.admin.settings",
    activity: "vireon.admin.activity",
    seeded: "vireon.admin.seeded"
};
function o(e) {
    return `${e}-${Math.random().toString(36).slice(2, 10)}`;
}
function d(e) {
    try {
        let t = window.localStorage.getItem(e);
        if (t) {
            return JSON.parse(t);
        }
        return null;
    } catch (e) {
        return null;
    }
}
function c(e, t) {
    try {
        window.localStorage.setItem(e, JSON.stringify(t));
    } catch (e) {}
}
let m = ()=>new Date().toISOString();
let u = (e)=>new Date(Date.now() + 86400000 * e).toISOString();
let p = [
    {
        id: "u-admin",
        firstName: "Avery",
        lastName: "Quinn",
        email: "admin@vireonmax.local",
        role: "admin",
        status: "active",
        access: "none",
        emailVerified: true,
        isSample: false,
        createdAt: u(-40)
    },
    {
        id: "u-alex",
        firstName: "Alex",
        lastName: "Morgan",
        email: "alex@vireonmax.local",
        role: "member",
        status: "active",
        access: "active",
        emailVerified: true,
        isSample: true,
        createdAt: u(-21)
    },
    {
        id: "u-jordan",
        firstName: "Jordan",
        lastName: "Lee",
        email: "jordan@vireonmax.local",
        role: "member",
        status: "active",
        access: "active",
        emailVerified: true,
        isSample: true,
        createdAt: u(-14)
    },
    {
        id: "u-sam",
        firstName: "Sam",
        lastName: "Patel",
        email: "sam@vireonmax.local",
        role: "member",
        status: "suspended",
        access: "revoked",
        emailVerified: true,
        isSample: true,
        createdAt: u(-9)
    }
];
let v = [
    {
        id: "inv-demo",
        label: "Final vite",
        hint: "8f2c4e",
        intendedEmail: "",
        expiresAt: u(14),
        status: "active",
        usedByEmail: null,
        isSample: true,
        createdAt: u(-2)
    }
];
let h = [
    {
        id: "n-welcome",
        title: "Welcome to VIREON MAX",
        body: "Your sample account is ready. Progress on this account is demonstration data stored in the local browser.",
        isSample: true,
        createdAt: u(-7)
    }
];
let x = [
    {
        id: "o-verify",
        to: "alex@vireonmax.local",
        subject: "Confirm your email",
        body: "Open the link below to confirm this address. The link expires in one day.",
        createdAt: u(-21)
    }
];
let f = [
    {
        id: "a1",
        summary: "Alex Morgan completed a program day.",
        isSample: true,
        at: u(-1)
    },
    {
        id: "a2",
        summary: "Demo library published.",
        isSample: true,
        at: u(-6)
    },
    {
        id: "a3",
        summary: "Jordan Lee finished the 7-day program.",
        isSample: true,
        at: u(-8)
    },
    {
        id: "a4",
        summary: "Alex Morgan activated a demo invite.",
        isSample: true,
        at: u(-21)
    }
];
let y = {
    supportEmail: "support@vireonprotocols.com",
    showPendingClinicalContent: true
};
let g = {
    foods: "nutrition",
    recipes: "recipes",
    exercises: "exercises",
    articles: "ed"
};
export function z8() {
    let [ready, setReady] = a.useState(false);
    let [i, setI] = a.useState(p);
    let [j, setJ] = a.useState(v);
    let [k, setK] = a.useState([]);
    let [N, setN] = a.useState([]);
    let [A, setA] = a.useState(h);
    let [outbox] = a.useState(x);
    let [settings, setSettings] = a.useState(y);
    let [activity, setActivity] = a.useState(f);
    a.useEffect(()=>{
        try {
            if (window.localStorage.getItem(r.seeded) !== "1") {
                c(r.people, p);
                c(r.invites, v);
                c(r.library, (()=>{
                    let e = [];
                    [
                        "foods",
                        "recipes",
                        "exercises"
                    ].forEach((kind)=>{
                        let i = s.R6.find((e)=>e.slug === g[kind]);
                        if (i != null) {
                            i.items.forEach((i, a)=>{
                                let d = {
                                    id: o("lib"),
                                    kind,
                                    slug: i.slug,
                                    summary: i.text.en,
                                    image: null,
                                    published: true,
                                    clinicalReview: "approved"
                                };
                                if (kind === "recipes") {
                                    e.push({
                                        ...d,
                                        title: i.title.en,
                                        category: "breakfast",
                                        minutes: 15,
                                        servings: 2,
                                        difficulty: "Easy",
                                        ingredients: "",
                                        steps: (i.body?.en ?? []).join("\n")
                                    });
                                } else {
                                    e.push({
                                        ...d,
                                        name: i.title.en,
                                        category: kind === "foods" ? "Heart-Healthy Foods" : "Cardiovascular Exercise",
                                        description: i.text.en,
                                        context: kind === "foods" ? i.text.en : undefined,
                                        instructions: kind === "exercises" ? (i.body?.en ?? []).join("\n") : undefined,
                                        duration: kind === "exercises" ? "10 minutes" : undefined,
                                        repetitions: kind === "exercises" ? "As comfortable" : undefined,
                                        safety: kind === "exercises" ? "Stop if you feel pain, dizziness, or chest discomfort." : undefined,
                                        contraindications: kind === "exercises" ? "Skip this if a clinician has limited your activity." : undefined
                                    });
                                }
                            });
                        }
                    });
                    n.x.forEach((t)=>{
                        e.push({
                            id: o("lib"),
                            kind: "articles",
                            slug: t.slug,
                            summary: t.text.en,
                            image: null,
                            published: true,
                            clinicalReview: "approved",
                            title: t.title.en,
                            module: "ed",
                            category: "Education",
                            body: (t.body?.en ?? [
                                t.text.en
                            ]).join("\n\n"),
                            minutes: 5,
                            sources: ""
                        });
                    });
                    return e;
                })());
                c(r.programs, l.i.map((e)=>({
                        id: o("prog"),
                        slug: e.slug,
                        title: e.slug === "7-day-starter" ? "7-day starter" : "30-day wellness journey",
                        summary: e.slug === "7-day-starter" ? "A short introduction to habits you can repeat." : "A month of educational routines, one day at a time.",
                        level: e.level,
                        published: true,
                        clinicalReview: "approved",
                        days: e.weeks.flatMap((e)=>e.days.map((t)=>({
                                    id: o("day"),
                                    dayNumber: t.dayNumber,
                                    title: t.title.en,
                                    introduction: t.introduction,
                                    article: t.article,
                                    activityTitle: t.activityTitle,
                                    activityBody: t.activityBody,
                                    weekNumber: e.week,
                                    weekTitle: e.title?.en ?? e.title,
                                    published: true,
                                    tasks: t.tasks.join("\n")
                                })))
                    })));
                c(r.notices, h);
                c(r.outbox, x);
                c(r.activity, f);
                c(r.settings, [
                    y
                ]);
                window.localStorage.setItem(r.seeded, "1");
            }
            setI(d(r.people) ?? p);
            setJ(d(r.invites) ?? v);
            setK(d(r.library) ?? []);
            setN(d(r.programs) ?? []);
            setA(d(r.notices) ?? h);
            setActivity(d(r.activity) ?? f);
            let t = d(r.settings)?.[0];
            if (t) {
                setSettings(t);
            }
        } catch (e) {}
        setReady(true);
    }, []);
    let R = a.useCallback((summary)=>{
        setActivity((t)=>{
            let i = [
                {
                    id: o("a"),
                    summary,
                    isSample: false,
                    at: m()
                },
                ...t
            ].slice(0, 40);
            c(r.activity, i);
            return i;
        });
    }, []);
    let F = a.useCallback((e)=>{
        setI(e);
        c(r.people, e);
    }, []);
    let V = a.useCallback((e)=>{
        setJ(e);
        c(r.invites, e);
    }, []);
    let z = a.useCallback((e)=>{
        setK(e);
        c(r.library, e);
    }, []);
    let H = a.useCallback((e)=>{
        setN(e);
        c(r.programs, e);
    }, []);
    let L = a.useCallback((e)=>{
        setA(e);
        c(r.notices, e);
    }, []);
    let counts = a.useMemo(()=>{
        let e = i.filter((e)=>e.status !== "deleted");
        return {
            accounts: e.length,
            activeMembers: e.filter((e)=>e.role === "member" && e.status === "active" && e.access === "active").length,
            suspended: e.filter((e)=>e.status === "suspended" || e.access === "revoked").length,
            programsStarted: e.filter((e)=>e.role === "member" && e.status !== "deleted" && e.access === "active").length,
            sampleData: e.some((e)=>e.isSample)
        };
    }, [
        i
    ]);
    return {
        ready,
        people: i,
        invites: j,
        library: k,
        programs: N,
        notices: A,
        outbox,
        settings,
        activity,
        counts,
        toggleStatus: function(e) {
            let t = i.find((t)=>t.id === e);
            if (!t) {
                return;
            }
            let status = t.status === "suspended" ? "active" : "suspended";
            F(i.map((t)=>{
                if (t.id === e) {
                    return {
                        ...t,
                        status,
                        access: status === "suspended" ? "revoked" : "active"
                    };
                }
                return t;
            }));
            R(`${t.firstName} ${t.lastName} ${status === "suspended" ? "was suspended." : "was reactivated."}`);
        },
        toggleAccess: function(e) {
            let t = i.find((t)=>t.id === e);
            if (!t) {
                return;
            }
            let access = t.access === "revoked" ? "active" : "revoked";
            F(i.map((t)=>{
                if (t.id === e) {
                    return {
                        ...t,
                        access
                    };
                }
                return t;
            }));
            R(`Access ${access === "revoked" ? "removed for" : "returned to"} ${t.firstName} ${t.lastName}.`);
        },
        createInvite: function(e) {
            let token = Math.random().toString(36).slice(2, 14);
            let i = {
                id: o("inv"),
                label: e.label.trim() || "Invitation",
                hint: token.slice(0, 8),
                intendedEmail: e.email.trim(),
                expiresAt: u(Math.max(1, Math.min(90, e.expiresInDays))),
                status: "active",
                usedByEmail: null,
                isSample: false,
                createdAt: m()
            };
            V([
                i,
                ...j
            ]);
            R(`Invite created for ${i.label}.`);
            return {
                ...i,
                token
            };
        },
        revokeInvite: function(e) {
            let t = j.find((t)=>t.id === e);
            V(j.map((t)=>{
                if (t.id === e) {
                    return {
                        ...t,
                        status: "revoked"
                    };
                }
                return t;
            }));
            if (t) {
                R(`Invite ${t.label} revoked.`);
                if (t.usedByEmail) {
                    F(i.map((e)=>{
                        if (e.email === t.usedByEmail) {
                            return {
                                ...e,
                                access: "revoked"
                            };
                        }
                        return e;
                    }));
                }
            }
        },
        saveSettings: function(e) {
            setSettings(e);
            c(r.settings, [
                e
            ]);
            R("Settings saved.");
        },
        removeSampleData: function() {
            F(i.filter((e)=>!e.isSample));
            V(j.filter((e)=>!e.isSample));
            L(A.filter((e)=>!e.isSample));
            setActivity((e)=>{
                let t = e.filter((e)=>!e.isSample);
                c(r.activity, t);
                return t;
            });
            R("Demo accounts removed. Content stays.");
        },
        createItem: function(kind, t) {
            let i = {
                ...t,
                id: o("lib"),
                kind
            };
            z([
                i,
                ...k
            ]);
            R(`${i.name || i.title || "Item"} created.`);
            return i;
        },
        saveItem: function(e, t) {
            z(k.map((i)=>{
                if (i.id === e) {
                    return {
                        ...i,
                        ...t
                    };
                }
                return i;
            }));
            R(`${t.name || t.title || "Item"} saved.`);
        },
        deleteItem: function(e) {
            let t = k.find((t)=>t.id === e);
            z(k.filter((t)=>t.id !== e));
            if (t) {
                R(`${t.name || t.title || "Item"} deleted.`);
            }
        },
        togglePublished: function(e) {
            z(k.map((t)=>{
                if (t.id === e) {
                    return {
                        ...t,
                        published: !t.published
                    };
                }
                return t;
            }));
        },
        toggleReview: function(e) {
            z(k.map((t)=>{
                if (t.id === e) {
                    return {
                        ...t,
                        clinicalReview: t.clinicalReview === "approved" ? "pending" : "approved"
                    };
                }
                return t;
            }));
        },
        createProgram: function(e) {
            let t = {
                id: o("prog"),
                slug: e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                title: e.title,
                summary: e.summary,
                level: "Custom",
                published: false,
                clinicalReview: "pending",
                days: []
            };
            H([
                t,
                ...N
            ]);
            R(`Program ${t.title} created as a draft.`);
            return t;
        },
        saveProgram: function(e, t) {
            H(N.map((i)=>{
                if (i.id === e) {
                    return {
                        ...i,
                        ...t
                    };
                }
                return i;
            }));
            R("Program saved.");
        },
        deleteProgram: function(e) {
            let t = N.find((t)=>t.id === e);
            H(N.filter((t)=>t.id !== e));
            if (t) {
                R(`Program ${t.title} deleted.`);
            }
        },
        addDay: function(e) {
            H(N.map((t)=>{
                if (t.id !== e) {
                    return t;
                }
                let dayNumber = t.days.length + 1;
                return {
                    ...t,
                    days: [
                        ...t.days,
                        {
                            id: o("day"),
                            dayNumber,
                            title: `Day ${dayNumber}`,
                            introduction: "",
                            article: "",
                            activityTitle: "",
                            activityBody: "",
                            weekNumber: Math.ceil(dayNumber / 7),
                            weekTitle: null,
                            published: false,
                            tasks: ""
                        }
                    ]
                };
            }));
        },
        saveDay: function(e, t, i) {
            H(N.map((a)=>{
                if (a.id === e) {
                    return {
                        ...a,
                        days: a.days.map((e)=>{
                            if (e.id === t) {
                                return {
                                    ...e,
                                    ...i
                                };
                            }
                            return e;
                        })
                    };
                }
                return a;
            }));
        },
        deleteDay: function(e, t) {
            H(N.map((i)=>{
                if (i.id === e) {
                    return {
                        ...i,
                        days: i.days.filter((e)=>e.id !== t)
                    };
                }
                return i;
            }));
        },
        publishNotice: function(e) {
            let t = {
                id: o("n"),
                ...e,
                isSample: false,
                createdAt: m()
            };
            L([
                t,
                ...A
            ]);
            R(`Notice published: ${t.title}.`);
            return t;
        }
    };
}
export function fn(e) {
    return `${window.location.origin}/invite/${e}`;
}
