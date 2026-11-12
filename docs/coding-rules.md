# Coding rules

The rules Ahsan and Ammar both follow, so the code reads as if one person wrote it. ESLint, Prettier, Commitlint and the git hooks enforce part of this automatically. The rest is on us during review.

## Setup

- Node 24 (see `.nvmrc`), pnpm 10. Run `pnpm install` after every pull from main.
- Use pnpm only. Never run `npm install` or `yarn`; they create a second lockfile.
- Add packages with `pnpm add <name>` (or `pnpm add -D` for dev tools). Versions get pinned exactly because of `.npmrc`. Mention every new package in the PR description and say why it's needed.
- Don't upgrade Next.js, React or Tailwind on a feature branch. Upgrades get their own PR.

## Who owns what

Each person owns whole pages and some shared parts. Changing something the other person owns needs their review.

| Ahsan                                                       | Ammar                                            |
| ----------------------------------------------------------- | ------------------------------------------------ |
| Home and Services pages                                     | About and Contact pages                          |
| `app/globals.css` (tokens)                                  | `content/` (types and all copy)                  |
| `components/layout/`, `components/ui/`, `components/brand/` | `lib/` schemas, form, API routes                 |
| Hero, header, navbar, mobile menu, footer                   | CI, SEO files (sitemap, robots, structured data) |
| `lib/cn.ts`, `lib/nav-items.ts`                             | Deployment, README, `docs/`                      |

Both pages and the shared parts import shared components. Never copy a component into your page to tweak it. Add a prop instead, and get the owner's review.

## Folders

```text
app/                 routes, layout, api
components/ui        Button and other small pieces
components/layout    Container, Section, SiteHeader
components/sections  Hero and page sections
components/brand     Logo
content/             all page text as typed files (one per page)
lib/                 cn.ts, nav-items.ts, zod schemas, helpers
public/brand/        logo files
tests/unit           Vitest tests
tests/e2e            Playwright tests
docs/                these guides
```

## Naming

| Thing                | Style                                        | Example                             |
| -------------------- | -------------------------------------------- | ----------------------------------- |
| Component files      | PascalCase `.tsx`                            | `SiteHeader.tsx`, `Hero.tsx`        |
| Other files          | kebab-case                                   | `nav-items.ts`, `inquiry-schema.ts` |
| Components           | PascalCase                                   | `ServiceCard`                       |
| Functions, variables | camelCase                                    | `formatPhone`, `homePage`           |
| Types                | PascalCase, no `I` prefix                    | `Hero`, `ServiceGroup`              |
| Constants            | camelCase, or UPPER_SNAKE for true constants | `MAX_MESSAGE_LENGTH`                |
| CSS variables        | `--color-*`, `--motion-*`                    | `--color-secondary`                 |
| Branches             | `type/short-name`                            | `feat/contact-page`                 |

## TypeScript

- Strict mode stays on. Don't turn any check off in `tsconfig.json`.
- No `any`. If a type is unknown, use `unknown` and narrow it.
- No `@ts-ignore`. If you really need to silence something, use `@ts-expect-error` with a comment saying why.
- Import with the `@/` alias (`@/content`, `@/components/ui/Button`), not long `../../` paths.
- Use `import type` for type-only imports.
- Export named functions and components. Default exports only where Next.js requires them (`page.tsx`, `layout.tsx`, config files).

## React and Next.js

- Every page starts with the shared hero: `<Hero hero={page.hero} />` from `components/sections/Hero.tsx`. It fills the first screen (`100svh` minus the header), so the next section only shows after scrolling. Don't build page-specific heroes.
- Every section after the hero uses the shared `Section`, which also fills the screen below the header by default, with its content centred. So the next section or the footer only shows after scrolling. Taller content makes the section grow. Use `fullScreen={false}` only for special cases.
- Server components by default. Add `"use client"` only to components that need state, effects or browser events (mobile menu, form). Keep those components small.
- Navigation uses `next/link` to real routes (`/`, `/about`, `/services`, `/contact`). No hash links for the main nav.
- Site navigation links (navbar, mobile menu, logo, footer Quick Links) use `PageLink` from `components/ui/PageLink.tsx`, not plain `next/link`. Clicking the page you are already on then scrolls back to the top (smoothly, or instantly with reduced motion) instead of doing nothing.
- Images use `next/image` with `width`, `height` (or `fill` plus `sizes`) and real alt text. Only the hero image loads early, with `loading="eager"` or `fetchPriority="high"`. Next.js 16 deprecated `priority`, so don't use it.
- Fonts use `next/font`. No `<link>` to Google Fonts.
- Each page sets its own title and description from its content file (`generateMetadata` or `metadata`).
- Next.js 16 has breaking changes from older versions. Check `node_modules/next/dist/docs/` before using an API you remember from Next 13 to 15.

## Content

- No visible text in components. All copy comes from `content/` (`import { homePage } from "@/content"`).
- Small UI labels that aren't in the copy document (like "Open menu" for a screen reader) can stay in the component.
- Add new content shapes to `content/types.ts` first, then the data.
- Don't change the client's wording. If something reads wrong, ask instead of editing.

## Styling

- Tailwind classes, mobile first. Write the phone layout with no prefix, then add `sm:`, `md:`, `lg:`, `xl:`.
- Colours only through tokens. No hex values, no arbitrary colours like `bg-[#1F4FD8]`.
- Animation durations only through motion tokens (170, 200 or 240 ms).
- Combine classes with `cn()` from `lib/cn.ts`.
- Prettier sorts Tailwind classes. Don't fight it.
- No inline `style={{}}` unless the value is truly dynamic.
- Follow `docs/brand.md` for colour, logo, motion and icon rules.

## Breakpoints

| Name | Width      | What changes                                                                                   |
| ---- | ---------- | ---------------------------------------------------------------------------------------------- |
| base | 320–639 px | One column, hamburger menu, full-width buttons                                                 |
| sm   | 640 px+    | Two-column card grids                                                                          |
| md   | 768 px+    | Form fields pair up. Still the hamburger menu                                                  |
| lg   | 1024 px+   | Inline nav plus a compact consultation button, four-up What We Do grid, hero text beside image |
| xl   | 1280 px+   | Full-size consultation button, content capped at about 1200 px                                 |

No page may scroll sideways at any width from 320 to 1920 px.

## Accessibility

- Every form field has a visible label. Errors are announced to screen readers.
- Buttons are `<button>`, links are `<a>`/`<Link>`. Never a clickable `<div>`.
- Visible focus rings on everything you can tab to.
- The mobile menu button has `aria-expanded`, closes on Escape and on route change.
- Decorative icons get `aria-hidden="true"`.
- Touch targets at least 44 x 44 px.

## Performance budget

- Under 150 KB of JavaScript per page (gzipped), under 1 MB total on first load.
- LCP under 2.0 s, CLS under 0.05, INP under 200 ms on a throttled phone.
- Lighthouse mobile 95+ in all four categories.
- No render-blocking third-party scripts.

## Security

- Never commit secrets. Keys go in `.env.local` (gitignored) and in Vercel settings. List new variable names in `.env.example` with empty values.
- Validate every form field on the server as well as in the browser.
- Never put user input into HTML without escaping it.

## Files that never get committed

- The WhatsApp logo images, under any name.
- The WBS and Architecture docx files, or any `.docx`.
- `.env.local` or any real key.

`.gitignore` blocks these, but check `git status` before every commit anyway.

## Git workflow

1. Start from fresh main: `git switch main && git pull && git switch -c feat/your-task`.
2. One task per branch. Keep branches short-lived, ideally merged the same day.
3. Branch prefixes: `feat/`, `fix/`, `docs/`, `chore/`, `test/`.
4. Never push to main directly. It's protected.

### Commit messages

- Format: `type: what changed`, lowercase, no full stop. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- One sentence. No "and". If you need "and" to describe it, make two commits.
- Write what the change does: `feat: add contact form`, `fix: stop navbar overlapping the hero on iPhone`.
- Commitlint rejects messages that break the format. The "no and" rule is checked in review.

### Pull requests

- Title follows the commit format.
- Description says which WBS task it is, what changed, and anything the reviewer should check. Add screenshots at 360, 768 and 1280 px for UI changes.
- CI must be green and the other person must approve.
- Review within 2 hours. Comment on what's wrong and suggest a fix; approve when it's good enough, not perfect.
- Squash merge, then delete the branch.
- Merge finished work to main before the end of the day.

## Definition of done

A task is done when all of these are true:

- `pnpm lint`, `pnpm typecheck` and `pnpm build` pass, and CI is green.
- Checked in the browser at 360, 768 and 1280 px, with no sideways scroll.
- Colours and copy match `docs/brand.md` and the content files.
- Transitions stay between 170 and 240 ms.
- No accessibility issues from axe.
- Reviewed and merged to main.
