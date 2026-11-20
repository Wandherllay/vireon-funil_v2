// @ts-nocheck
/* eslint-disable */
import * as r from "./module-7629.jsx";

import A from "../shim/link.jsx";
import * as l from "./module-3677.jsx";
export function ContentClient() {
    let { t: t_1 } = l.s9();
    let t = [
        {
            title: t_1("admin.content.programs"),
            text: t_1("admin.content.programsText"),
            href: "/admin/content/programs"
        },
        {
            title: t_1("admin.content.foods"),
            text: t_1("admin.content.foodsText"),
            href: "/admin/content/foods"
        },
        {
            title: t_1("admin.content.recipes"),
            text: t_1("admin.content.recipesText"),
            href: "/admin/content/recipes"
        },
        {
            title: t_1("admin.content.exercises"),
            text: t_1("admin.content.exercisesText"),
            href: "/admin/content/exercises"
        },
        {
            title: t_1("admin.content.articles"),
            text: t_1("admin.content.articlesText"),
            href: "/admin/content/articles"
        }
    ];
    return <r.i><div className="space-y-4"><h1 className="font-display text-3xl">{t_1("admin.content.title")}</h1><p className="text-sm text-mist">{t_1("admin.content.sub")}</p><div className="grid gap-3 sm:grid-cols-2">{t.map((e)=><A key={e.href} href={e.href} className="block"><section className="app-card p-5 transition hover:border-accent/40"><p className="font-semibold">{e.title}</p><p className="mt-1 text-sm text-mist">{e.text}</p></section></A>)}</div></div></r.i>;
}
