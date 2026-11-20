// @ts-nocheck
/* eslint-disable */

import _t from "../shim/link.jsx";
import * as c from "./module-7629.jsx";
import * as l from "./module-3677.jsx";
import * as r from "./module-6390.jsx";
let d = {
    foods: "admin.content.foods",
    recipes: "admin.content.recipes",
    exercises: "admin.content.exercises",
    articles: "admin.content.articles"
};
export function LibraryClient({ kind }) {
    let { t: t_1 } = l.s9();
    let { ready, library } = r.z8();
    let x = library.filter((e)=>e.kind === kind);
    return <c.i><div className="space-y-4"><_t href="/admin/content" className="text-sm text-cyan">{t_1("admin.content.title")}</_t><div className="flex flex-wrap items-center justify-between gap-3"><h1 className="min-w-0 font-display text-2xl sm:text-3xl">{t_1(d[kind])}</h1><_t href={`/admin/content/${kind}/new`}><span className="app-btn w-auto">{t_1("admin.library.new")}</span></_t></div>{ready && x.length === 0 && <section className="app-card p-6 text-center"><h2 className="font-display text-xl">{t_1("admin.library.emptyTitle")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-mist">{t_1("admin.library.emptyBody")}</p></section>}<div className="space-y-3">{x.map((e)=><_t key={e.id} href={`/admin/content/${kind}/${e.id}`} className="block"><section className="app-card p-4"><p className="font-semibold">{e.name || e.title}</p><p className="text-sm text-mist">{e.published ? t_1("admin.library.published") : t_1("admin.library.draft")} · {t_1(`admin.review.${e.clinicalReview}`)}</p></section></_t>)}</div></div></c.i>;
}
