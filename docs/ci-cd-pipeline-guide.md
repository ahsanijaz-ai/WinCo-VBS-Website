# CI/CD pipeline guide

How code gets from a branch to the live site, what the checks do, and how to fix them when they fail. Nothing is ever uploaded by hand. Everything deploys from Git.

## The flow

```text
feature branch ──push──> GitHub ──PR──> CI check ("ci") + Vercel preview
                                              │
                                   1 approval + green CI
                                              │
                                     squash merge to main
                                              │
                                  Vercel production deploy
```

1. You push a branch and open a PR.
2. GitHub Actions runs the `ci` check.
3. Vercel builds a preview of the PR and posts a link on it. Open it on your phone.
4. The other developer reviews. When CI is green and the PR is approved, squash merge.
5. Merging to main deploys production automatically.

## Environments

| Environment | Trigger       | URL                   | Notes                                                        |
| ----------- | ------------- | --------------------- | ------------------------------------------------------------ |
| Local       | `pnpm dev`    | http://localhost:3000 | Uses `.env.local`                                            |
| Preview     | Every PR      | Unique Vercel URL     | Test keys only, safe to share with the client                |
| Production  | Merge to main | Client domain (later) | Live keys. Uses the Vercel address until the domain is ready |

## The CI check

File: `.github/workflows/ci.yml`. It runs on every pull request and on every push to main.

| Step         | Command                          | What it catches                                  |
| ------------ | -------------------------------- | ------------------------------------------------ |
| Install      | `pnpm install --frozen-lockfile` | `package.json` and `pnpm-lock.yaml` out of sync  |
| Lint         | `pnpm lint`                      | ESLint errors (React, Next.js, TypeScript rules) |
| Format check | `pnpm format:check`              | Files not formatted with Prettier                |
| Type-check   | `pnpm typecheck`                 | TypeScript errors. Runs `next typegen` first     |
| Build        | `pnpm build`                     | Anything that breaks the production build        |

The job uses the Node version in `.nvmrc` (24) and the pnpm version in `package.json`, so CI matches our machines. pnpm's store is cached between runs.

The check is named `ci`. Branch protection on main requires it to pass.

### Run the same checks locally before pushing

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm build
```

If all four pass locally, CI should pass too.

## Git hooks (run on your machine)

Husky installs these when you run `pnpm install`.

| Hook         | What it does                                                         |
| ------------ | -------------------------------------------------------------------- |
| `pre-commit` | lint-staged runs ESLint `--fix` and Prettier on the files you staged |
| `commit-msg` | Commitlint rejects messages that don't follow `type: message`        |

If hooks don't run, run `pnpm install` again. Never skip them with `--no-verify`.

## When CI fails

Open the failed run from the PR ("Details" next to `ci`) and find the red step.

| Failed step  | Usual cause                                                         | Fix                                                                    |
| ------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Install      | `ERR_PNPM_OUTDATED_LOCKFILE`: someone edited `package.json` by hand | Run `pnpm install` locally, commit the updated `pnpm-lock.yaml`        |
| Install      | Lockfile from npm or yarn                                           | Delete it, run `pnpm install`, commit `pnpm-lock.yaml` only            |
| Lint         | ESLint error                                                        | Run `pnpm lint`, fix what it reports (many fix with `pnpm lint --fix`) |
| Format check | File not formatted                                                  | Run `pnpm format`, commit the result                                   |
| Type-check   | Type error, or missing route types                                  | Run `pnpm typecheck` locally and fix the error                         |
| Build        | Code works in dev but breaks in production                          | Run `pnpm build` locally and read the first error                      |

Push the fix to the same branch. CI runs again by itself.

## Vercel

Ahsan owns the Vercel project, connected to the GitHub repo.

- Every PR gets a preview deployment, and Vercel comments the link on the PR.
- Merging to main deploys production.
- Environment variables are set in Vercel project settings, separately for Preview and Production. Never put real keys in the repo.
- Rollback: Vercel dashboard, Deployments, pick the last good deployment, "Promote to Production". It takes seconds. Then fix the bug with a normal PR.

The repo is private and owned by Ahsan's account. On Vercel's free plan, pushes from a collaborator can be blocked from deploying. If a PR from Ammar shows no preview link, tell Ahsan straight away so we can sort it out.

## Branch protection on main

Set by Ahsan in GitHub, Settings, Branches:

- Pull request required before merging, with 1 approval
- Status check `ci` must pass
- No direct pushes, no force pushes

## Secrets and environment variables

- Real values go in `.env.local` locally (gitignored) and in Vercel settings for deploys.
- Every variable name goes in `.env.example` with an empty value, so the other developer knows it exists.
- Use separate keys for Preview and Production.
- If a key ever gets committed, treat it as leaked: revoke it, make a new one, then remove it from the repo.

## Planned additions

These get added to the CI workflow later in the build:

| When  | Addition                                                                            |
| ----- | ----------------------------------------------------------------------------------- |
| Day 4 | Playwright end-to-end tests on phone and desktop sizes, run against the preview URL |
| Day 4 | axe accessibility checks                                                            |
| Day 4 | Lighthouse CI against the performance budget (mobile 95+)                           |
| Day 4 | Production domain connected in Vercel                                               |
| After | Dependabot for dependency updates                                                   |

Update this guide in the same PR that changes the pipeline.

## Monthly routine after launch

- Update dependencies in one PR and check the preview.
- Review security notices (`pnpm audit`).
- Confirm the live site and the contact page still work.
