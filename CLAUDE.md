# CLAUDE.md

Guidance for working in this repository.

## Stack

- **Vite + React**, written in **JavaScript** (`.jsx` / `.js` — not TypeScript).
- **React Router** for navigation between pages.
- All data is **placeholder/dummy**. Do **not** add API calls, fetches, or any backend. Hard-code mock data locally.

## Design system — source of truth

- The design system lives in the **`DESIGN.md`** files (one per `stitch_*` folder). All colors, fonts, spacing, and component patterns **must** come from there. Read the relevant `DESIGN.md` before styling anything.
- Translate the `DESIGN.md` tokens into **CSS custom properties** in [src/styles/globals.css](src/styles/globals.css). Components reference those variables (e.g. `var(--color-primary)`) rather than hard-coded values.

## Reference designs (Stitch exports)

- The folders starting with **`stitch_`** in the workspace root are reference designs exported from our design tool. Each contains:
  - `code.html` — the reference markup/layout to match
  - `screen.png` — a screenshot of the intended result
  - `DESIGN.md` — the design tokens/system for that screen
- When building React components, **match the look and layout of the `code.html` reference files** (use `screen.png` to confirm intent).

## Project structure

- **Components** go in `src/components/`, each component in **its own folder** (e.g. `src/components/Button/Button.jsx`).
- **Page components** go in `src/pages/`.
- Global styles and design tokens live in `src/styles/globals.css`.

## Component breakdown

- **Never build an entire page as a single monolithic component.** Always follow the component breakdown specified by the user — compose pages from smaller components in `src/components/`.

## Verification

- After making changes, **always verify in the browser** that the result visually matches the reference `code.html` files (and `screen.png`). Run the dev server and visually compare before considering a task done.
