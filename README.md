# WinCo VBS Website

Marketing website for WinCo Virtual Business Solutions (Bridgetown, Barbados).
Four pages (Home, About Us, Services, Contact Us) and one inquiry form.

Built by Ahsan and Ammar. See the Architecture Document and the WBS for the full plan.

## Stack

| Tool         | Version                        |
| ------------ | ------------------------------ |
| Node.js      | 24 LTS (see `.nvmrc`)          |
| pnpm         | 10.34.9 (see `packageManager`) |
| Next.js      | 16.4.6 (App Router)            |
| React        | 19.3.0                         |
| TypeScript   | 5.9.3, strict mode             |
| Tailwind CSS | 4.3.3                          |

All package versions are pinned exactly. `.npmrc` keeps new installs exact too.

## Setup

```bash
git clone https://github.com/ahsanijaz-ai/WinCo-VBS-Website.git
cd WinCo-VBS-Website
pnpm install          # also installs the git hooks
cp .env.example .env.local
pnpm dev              # http://localhost:3000
```

No pnpm yet? Run `npm i -g pnpm@10`.

## Scripts

| Command             | What it does                              |
| ------------------- | ----------------------------------------- |
| `pnpm dev`          | Local dev server                          |
| `pnpm build`        | Production build                          |
| `pnpm lint`         | ESLint                                    |
| `pnpm typecheck`    | Generates Next.js route types, then `tsc` |
| `pnpm format`       | Formats everything with Prettier          |
| `pnpm format:check` | Checks formatting (used in CI)            |

## Environment variables

Listed in `.env.example`. Put real values in `.env.local` (never committed) and in Vercel
project settings. Use separate keys for preview and production.

## Folders

```
app/                 routes, layout, api
components/ui        Button and other small pieces
components/layout    Container, Section, SiteHeader
components/sections  Hero and page sections
components/brand     Logo
content/             all page text as typed files (one per page)
lib/                 cn.ts, nav-items.ts, zod schemas, email
public/brand/        logos
tests/               unit and e2e
```

Colours and animation times live in `app/globals.css`.

## How we work

- `main` is protected. No direct pushes; every change is a pull request.
- Branch names: `feat/<short-name>`, `fix/<short-name>`, e.g. `feat/contact-page`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org):
  `feat: add contact form`, `fix: navbar overlap on iPhone`, `chore: update deps`.
  A git hook rejects anything else.
- Before each commit, lint-staged runs ESLint and Prettier on the changed files.
- A PR needs one approval from the other developer and a green `ci` check. Review within 2 hours.
- Squash merge. Merge finished work to `main` before the end of the day.
- Check every page at 360, 768 and 1280 px before asking for review.

## Ownership

| Ahsan                                                            | Ammar                                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Home, Services pages                                             | About, Contact pages                                                                        |
| Design tokens, layout, header, navbar, mobile menu, Hero, footer | Repo setup, CI, content files, inquiry form and API, spam protection, SEO files, deployment |
