// @ts-nocheck
/* eslint-disable */
import * as i from "./module-773.jsx";
import { IG, Op } from "./module-4666.jsx";
import * as p from "./module-4211.jsx";
import { p as p_1 } from "./module-9571.jsx";

import _r from "../shim/link.jsx";
import * as n from "react";
import * as o from "./module-4230.jsx";
let c = {
    salmon: [
        "Bake a fillet with vegetables and potatoes.",
        "Flake leftovers onto a salad.",
        "Pair with beans or whole grains rather than making fish the whole plate."
    ],
    beans: [
        "Add a scoop to a grain bowl.",
        "Simmer lentils into a vegetable soup.",
        "Mash beans with olive oil as a spread."
    ],
    spinach: [
        "Wilt a handful into eggs.",
        "Use as the base of a bowl.",
        "Add to lentil soup near the end of cooking."
    ],
    oranges: [
        "Eat it whole as a snack.",
        "Add segments to a salad.",
        "Pair with yogurt or nuts."
    ],
    tomatoes: [
        "Roast a tray with other vegetables.",
        "Add to a bean stew.",
        "Use fresh slices beside eggs."
    ],
    "olive-oil": [
        "Dress a salad.",
        "Finish a vegetable soup.",
        "Use a measured spoon when roasting vegetables."
    ],
    avocado: [
        "Slice onto eggs or beans.",
        "Add to a grain bowl.",
        "Mash a small amount onto whole-grain toast."
    ],
    walnuts: [
        "Stir into oatmeal.",
        "Pair with fruit.",
        "Chop over a salad or roasted vegetables."
    ],
    oats: [
        "Cook with milk or fortified soy drink and add berries.",
        "Make overnight oats.",
        "Use leftovers as a base and add nuts."
    ],
    quinoa: [
        "Use as the base of a lunch bowl.",
        "Stir into soup.",
        "Serve under roasted vegetables and beans."
    ],
    "brown-rice": [
        "Serve beside salmon and greens.",
        "Mix with beans and salsa.",
        "Cool and use in a lunch bowl."
    ],
    blueberries: [
        "Add to oats or yogurt.",
        "Eat a handful as a snack.",
        "Freeze them and blend into a smoothie with milk and oats."
    ],
    water: [
        "Keep a glass with meals.",
        "Drink with activity.",
        "Use sparkling water if that helps you skip sweetened drinks."
    ],
    "unsweetened-tea": [
        "Brew a pot with lunch.",
        "Choose a caffeine-free infusion in the evening.",
        "Skip the syrups and sweetened mixes."
    ],
    "plain-yogurt": [
        "Top with berries and a few walnuts.",
        "Use as a sauce with herbs instead of mayonnaise.",
        "Pair with oats."
    ]
};
let d = {
    salmon: [
        "salmon-plate"
    ],
    spinach: [
        "veggie-scramble",
        "lentil-soup"
    ],
    tomatoes: [
        "chickpea-bowl",
        "lentil-soup"
    ],
    "olive-oil": [
        "veggie-scramble",
        "chickpea-bowl",
        "chicken-grain-bowl"
    ],
    avocado: [
        "salmon-plate"
    ],
    walnuts: [
        "berry-oat-bowl",
        "yogurt-cup",
        "apple-walnut-snack"
    ],
    oats: [
        "berry-oat-bowl"
    ],
    quinoa: [
        "chickpea-bowl"
    ],
    "brown-rice": [
        "chickpea-bowl",
        "chicken-grain-bowl",
        "salmon-plate"
    ],
    blueberries: [
        "berry-oat-bowl"
    ],
    "unsweetened-tea": [
        "berry-oat-bowl"
    ],
    "plain-yogurt": [
        "yogurt-cup"
    ]
};
import * as h from "./module-3677.jsx";
export function ItemClient({ category, slug }) {
    let { email } = IG();
    let { t: t_1, lang } = h.s9();
    let { saved, toggle } = p.r();
    let { logRead } = p_1();
    let k = o.Rm(category, slug);
    n.useEffect(()=>{
        if (k) {
            logRead(k.title[lang], category, slug);
        }
    }, [
        category,
        slug
    ]);
    if (!k) {
        return null;
    }
    let y = p.N(category, slug);
    let N = saved.includes(y);
    let S = category === "nutrition";
    return <i.GV current="/start/discover"><i.wc/><article className="space-y-4"><_r href={Op(`/start/discover/${category}`, email)} className="text-sm text-cyan">{t_1("discover.back")}</_r><div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between"><div className="min-w-0"><p className="text-xs uppercase tracking-wide text-faint">{t_1(`tag.${k.tag}`)}</p><h1 className="font-display text-2xl sm:text-3xl">{k.title[lang]}</h1></div><button type="button" onClick={()=>toggle(y)} aria-pressed={N} className="app-btn-ghost shrink-0">{t_1(N ? "discover.saved" : "discover.save")}</button></div><p className="text-sm leading-6 text-mist">{k.text[lang]}</p><aside className="rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm leading-6 text-mist"><p className="font-semibold text-foam">{t_1("legal.short")}</p><p className="mt-1">{t_1("legal.line")}</p><p className="mt-1">{t_1("legal.pending")}</p><p className="mt-1">{t_1("legal.emergency")}</p></aside>{k.body && <section className="app-card p-5 text-sm leading-6 text-mist">{k.body[lang].map((e, t)=><p key={t} className={t === 0 ? undefined : "mt-3"}>{e}</p>)}</section>}{k.nutrition && <section className="app-card p-5"><h2 className="font-display text-xl">{t_1("discover.about")}</h2><dl className="mt-3 grid grid-cols-2 gap-3 text-sm">{k.nutrition.map((e)=><div key={e.label.en}><dt className="capitalize text-faint">{e.label[lang]}</dt><dd>{e.value[lang]}</dd></div>)}</dl><p className="mt-3 text-xs text-faint">{t_1("discover.approx")}</p></section>}{S && c[k.slug] && <section className="app-card p-5"><h2 className="font-display text-xl">{t_1("discover.uses")}</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mist">{c[k.slug].map((e)=><li key={e}>{e}</li>)}</ul></section>}{S && (d[k.slug] ?? []).length > 0 && <section className="app-card p-5"><h2 className="font-display text-xl">{t_1("discover.relatedRecipes")}</h2><ul className="mt-3 space-y-2">{(d[k.slug] ?? []).map((e)=>{
        let t = o.Rm("recipes", e);
        if (t) {
            return <li key={e}><_r href={Op(`/start/discover/recipes/${e}`, email)} className="text-cyan">{t.title[lang]}</_r></li>;
        }
        return null;
    })}</ul></section>}</article></i.GV>;
}
