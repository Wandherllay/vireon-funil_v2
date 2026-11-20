// @ts-nocheck
/* eslint-disable */

import _l from "../shim/link.jsx";
import * as s from "../shim/navigation.js";
import * as r from "react";
import * as d from "./module-7629.jsx";
import * as o from "./module-3677.jsx";
import * as c from "./module-6390.jsx";
let u = {
    foods: "admin.content.foods",
    recipes: "admin.content.recipes",
    exercises: "admin.content.exercises",
    articles: "admin.content.articles"
};
let m = [
    "Heart-Healthy Foods",
    "Fruits and Vegetables",
    "Healthy Fats",
    "Whole Grains",
    "Antioxidant-Rich Foods",
    "Hydration",
    "Balanced Nutrition"
];
let p = [
    "Cardiovascular Exercise",
    "Strength Training",
    "Mobility and Stretching",
    "Pelvic Floor Education",
    "Relaxation Exercises"
];
let h = [
    "breakfast",
    "lunch",
    "dinner",
    "snack"
];
let x = [
    {
        id: "sleep",
        label: "Sleep and Recovery"
    },
    {
        id: "stress",
        label: "Stress and Mindset"
    },
    {
        id: "ed",
        label: "ED Knowledge Center"
    }
];
function V1Component({ label: label_1, hint, children }) {
    return <label className="block"><span className="mb-1.5 block text-sm text-mist">{label_1}</span>{children}{hint && <span className="mt-1 block text-xs text-faint">{hint}</span>}</label>;
}
export function ItemEditor({ kind, itemId }) {
    let { t } = o.s9();
    let T = s.useRouter();
    let { ready, library, createItem, saveItem, deleteItem } = c.z8();
    let X = itemId === "new";
    let Y = X ? null : library.find((e)=>e.id === itemId);
    let [Z, setZ] = r.useState(X ? ((kind_1)=>{
        let i = {
            slug: "",
            summary: "",
            image: null,
            published: false,
            clinicalReview: "pending"
        };
        switch(kind_1){
            case "foods":
                return {
                    ...i,
                    name: "",
                    category: m[0],
                    description: "",
                    nutrition: {
                        serving: "",
                        calories: "",
                        protein: "",
                        carbohydrates: "",
                        fat: "",
                        fiber: "",
                        note: "Approximate values for education."
                    },
                    nutrients: "",
                    context: "",
                    mealIdeas: ""
                };
            case "recipes":
                return {
                    ...i,
                    title: "",
                    description: "",
                    minutes: 20,
                    servings: 2,
                    difficulty: "Easy",
                    category: "breakfast",
                    ingredients: "",
                    steps: "",
                    nutrition: {
                        calories: "",
                        protein: "",
                        carbohydrates: "",
                        fat: "",
                        note: "Estimated per serving."
                    }
                };
            case "exercises":
                return {
                    ...i,
                    name: "",
                    category: p[0],
                    description: "",
                    instructions: "",
                    duration: "10 minutes",
                    repetitions: "As comfortable",
                    safety: "Stop if you feel pain, dizziness, or chest discomfort.",
                    contraindications: "Skip this if a clinician has limited your activity."
                };
            default:
                return {
                    ...i,
                    title: "",
                    module: "sleep",
                    category: "Education",
                    body: "",
                    minutes: 5,
                    sources: ""
                };
        }
    })(kind) : null);
    let [ee, setEe] = r.useState("");
    function ea(e, i) {
        setZ((a)=>{
            if (a) {
                return {
                    ...a,
                    [e]: i
                };
            }
            return a;
        });
    }
    function onChange(e) {
        setZ((i)=>{
            if (i) {
                return {
                    ...i,
                    nutrition: {
                        ...i.nutrition ?? {},
                        ...e
                    }
                };
            }
            return i;
        });
    }
    r.useEffect(()=>{
        if (Y && !Z) {
            setZ({
                ...Y
            });
        }
    }, [
        Y
    ]);
    let el = X ? t("admin.library.newIn", {
        name: t(u[kind])
    }) : t("admin.library.edit", {
        name: Z?.name || Z?.title || ""
    });
    return <d.i><div className="space-y-4"><_l href={`/admin/content/${kind}`} className="text-sm text-cyan">{t(u[kind])}</_l><h1 className="font-display text-3xl">{el}</h1>{!Z && ready && <p className="text-sm text-mist">{t("admin.loading")}</p>}{Z && <section className="app-card p-5"><form className="space-y-3" onSubmit={function(e) {
        e.preventDefault();
        if (Z) {
            if (X) {
                let e = createItem(kind, Z);
                T.push(`/admin/content/${kind}/${e.id}`);
                return;
            }
            saveItem(itemId, Z);
            setEe(t("admin.library.saved"));
        }
    }}>{(kind === "foods" || kind === "exercises") && <V1Component label={t("admin.field.name")}><input className="app-input" value={Z.name ?? ""} onChange={(e)=>ea("name", e.target.value)} required/></V1Component>}{(kind === "articles" || kind === "recipes") && <V1Component label={t("admin.field.title")}><input className="app-input" value={Z.title ?? ""} onChange={(e)=>ea("title", e.target.value)} required/></V1Component>}<V1Component label={t("admin.field.summary")}><textarea className="app-input min-h-20 py-3" value={Z.summary} onChange={(e)=>ea("summary", e.target.value)} required/></V1Component>{kind === "foods" && <V1Component label={t("admin.field.category")}><select className="app-input" value={Z.category ?? m[0]} onChange={(e)=>ea("category", e.target.value)}>{m.map((e)=><option key={e} value={e}>{e}</option>)}</select></V1Component>}{kind === "exercises" && <V1Component label={t("admin.field.category")}><select className="app-input" value={Z.category ?? p[0]} onChange={(e)=>ea("category", e.target.value)}>{p.map((e)=><option key={e} value={e}>{e}</option>)}</select></V1Component>}{kind === "recipes" && <V1Component label={t("admin.field.category")}><select className="app-input" value={Z.category ?? "breakfast"} onChange={(e)=>ea("category", e.target.value)}>{h.map((e)=><option key={e} value={e}>{e}</option>)}</select></V1Component>}{kind === "articles" && <><V1Component label={t("admin.field.topic")}><select className="app-input" value={Z.module ?? "sleep"} onChange={(e)=>ea("module", e.target.value)}>{x.map((e)=><option key={e.id} value={e.id}>{e.label}</option>)}</select></V1Component><V1Component label={t("admin.field.category")}><input className="app-input" value={Z.category ?? ""} onChange={(e)=>ea("category", e.target.value)} required/></V1Component><V1Component label={t("admin.field.minutes")}><input className="app-input" type="number" min={1} value={Number(Z.minutes ?? 5)} onChange={(e)=>ea("minutes", Number(e.target.value))}/></V1Component></>}{(kind === "foods" || kind === "recipes" || kind === "articles") && <V1Component label={t("admin.field.body")}><textarea className="app-input min-h-40 py-3" value={(kind === "articles" ? Z.body : Z.description) ?? ""} onChange={(e)=>ea(kind === "articles" ? "body" : "description", e.target.value)} required/></V1Component>}{kind === "exercises" && <V1Component label={t("admin.field.description")}><textarea className="app-input min-h-28 py-3" value={Z.description ?? ""} onChange={(e)=>ea("description", e.target.value)} required/></V1Component>}<V1Component label={t("admin.field.image")} hint={t("admin.field.imageHint")}><input className="text-sm" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e)=>{
        let a = e.target.files?.[0];
        if (a) {
            ((e)=>{
                let i = new FileReader;
                i.onload = ()=>ea("image", String(i.result));
                i.onerror = ()=>setEe(t("admin.library.uploadFailed"));
                i.readAsDataURL(e);
            })(a);
        }
    }}/>{Z.image && <span className="mt-2 block text-xs text-faint">{t("admin.field.imageAttached")}</span>}</V1Component>{kind === "recipes" && <><div className="grid gap-3 md:grid-cols-3"><V1Component label={t("admin.field.minutes")}><input className="app-input" type="number" min={1} value={Number(Z.minutes ?? 15)} onChange={(e)=>ea("minutes", Number(e.target.value))}/></V1Component><V1Component label={t("admin.field.servings")}><input className="app-input" type="number" min={1} value={Number(Z.servings ?? 2)} onChange={(e)=>ea("servings", Number(e.target.value))}/></V1Component><V1Component label={t("admin.field.difficulty")}><select className="app-input" value={Z.difficulty ?? "Easy"} onChange={(e)=>ea("difficulty", e.target.value)}><option value="Easy">{t("admin.field.easy")}</option><option value="Moderate">{t("admin.field.moderate")}</option></select></V1Component></div><V1Component label={t("admin.field.ingredients")} hint={t("admin.field.ingredientsHint")}><textarea className="app-input min-h-28 py-3" value={Z.ingredients ?? ""} onChange={(e)=>ea("ingredients", e.target.value)}/></V1Component><V1Component label={t("admin.field.steps")} hint={t("admin.field.onePerLine")}><textarea className="app-input min-h-28 py-3" value={Z.steps ?? ""} onChange={(e)=>ea("steps", e.target.value)}/></V1Component></>}{kind === "foods" && <><FComponent value={Z.nutrition ?? {}} onChange={onChange} fiber/><V1Component label={t("admin.field.nutrients")} hint={t("admin.field.onePerLine")}><textarea className="app-input min-h-20 py-3" value={Z.nutrients ?? ""} onChange={(e)=>ea("nutrients", e.target.value)}/></V1Component><V1Component label={t("admin.field.context")}><textarea className="app-input min-h-24 py-3" value={Z.context ?? ""} onChange={(e)=>ea("context", e.target.value)} required/></V1Component><V1Component label={t("admin.field.mealIdeas")} hint={t("admin.field.onePerLine")}><textarea className="app-input min-h-20 py-3" value={Z.mealIdeas ?? ""} onChange={(e)=>ea("mealIdeas", e.target.value)}/></V1Component></>}{kind === "recipes" && <FComponent value={Z.nutrition ?? {}} onChange={onChange}/>}{kind === "exercises" && <><V1Component label={t("admin.field.steps")} hint={t("admin.field.onePerLine")}><textarea className="app-input min-h-24 py-3" value={Z.instructions ?? ""} onChange={(e)=>ea("instructions", e.target.value)}/></V1Component><V1Component label={t("admin.field.duration")}><input className="app-input" value={Z.duration ?? ""} onChange={(e)=>ea("duration", e.target.value)}/></V1Component><V1Component label={t("admin.field.repetitions")}><input className="app-input" value={Z.repetitions ?? ""} onChange={(e)=>ea("repetitions", e.target.value)}/></V1Component><V1Component label={t("admin.field.safety")}><textarea className="app-input min-h-20 py-3" value={Z.safety ?? ""} onChange={(e)=>ea("safety", e.target.value)} required/></V1Component><V1Component label={t("admin.field.skip")}><textarea className="app-input min-h-20 py-3" value={Z.contraindications ?? ""} onChange={(e)=>ea("contraindications", e.target.value)} required/></V1Component></>}{kind === "articles" && <V1Component label={t("admin.field.sources")} hint={t("admin.field.sourcesHint")}><textarea className="app-input min-h-20 py-3" value={Z.sources ?? ""} onChange={(e)=>ea("sources", e.target.value)}/></V1Component>}<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Z.published} onChange={(e)=>ea("published", e.target.checked)}/>{t("admin.field.published")}</label><V1Component label={t("admin.field.review")}><select className="app-input" value={Z.clinicalReview} onChange={(e)=>ea("clinicalReview", e.target.value)}><option value="pending">{t("admin.option.pending")}</option><option value="approved">{t("admin.option.approved")}</option></select></V1Component>{ee && <p className="text-sm text-mist" role="status">{ee}</p>}<div className="flex flex-wrap gap-2"><button type="submit" className="app-btn w-auto">{t("admin.save")}</button>{!X && <button type="button" onClick={function() {
        if (window.confirm(t("admin.library.deleteConfirm"))) {
            deleteItem(itemId);
            T.push(`/admin/content/${kind}`);
        }
    }} className="app-btn-danger">{t("admin.library.delete")}</button>}</div></form></section>}</div></d.i>;
}
function FComponent({ value, onChange, fiber = false }) {
    let { t } = o.s9();
    let s = fiber ? [
        {
            key: "serving",
            label: t("admin.field.nutritionServing")
        },
        {
            key: "calories",
            label: t("admin.field.nutritionCalories")
        },
        {
            key: "protein",
            label: t("admin.field.nutritionProtein")
        },
        {
            key: "carbohydrates",
            label: t("admin.field.nutritionCarbs")
        },
        {
            key: "fat",
            label: t("admin.field.nutritionFat")
        },
        {
            key: "fiber",
            label: t("admin.field.nutritionFiber")
        },
        {
            key: "note",
            label: t("admin.field.nutritionNote")
        }
    ] : [
        {
            key: "calories",
            label: t("admin.field.nutritionCalories")
        },
        {
            key: "protein",
            label: t("admin.field.nutritionProtein")
        },
        {
            key: "carbohydrates",
            label: t("admin.field.nutritionCarbs")
        },
        {
            key: "fat",
            label: t("admin.field.nutritionFat")
        },
        {
            key: "note",
            label: t("admin.field.nutritionNote")
        }
    ];
    return <div className="grid gap-3 md:grid-cols-2">{s.map((e)=><V1Component key={e.key} label={e.label}><input className="app-input" value={value[e.key] ?? ""} onChange={(i)=>onChange({
                [e.key]: i.target.value
            })}/></V1Component>)}</div>;
}
