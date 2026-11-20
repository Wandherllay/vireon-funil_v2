<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Vireon funnel clone
- Pages under `src/vireon/m/` are decompiled from the original Next.js site and kept as plain JSX so behaviour stays 1:1; `src/vireon/shim/` replaces next/link, next/image and next/navigation with TanStack equivalents. Why: the user wants the funnel 100% identical before editing it.
- Checkout links, prices, video ids and page paths live in `src/vireon/m/module-2523.jsx`; up1/up2 content in `src/vireon/upsells.ts`. Why: single place to swap checkout URLs.
- `public/vireon.css` is the original compiled stylesheet, loaded after Tailwind so it wins. Why: pixel-identical styling.
- Funnel videos and covers are repository-local files in `public/media`, played with native HTML video rather than a third-party embed; this makes playback independent of the original host and its domain permissions.
