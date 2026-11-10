# Brand guide

How the WinCo VBS brand looks on the website. Both of us follow this. If something here needs to change, change it in a PR so the other person sees it.

The colour values live in `app/globals.css` as CSS variables. This file explains how to use them. If the two ever disagree, `globals.css` wins and this file gets fixed.

## The business

- Name: WinCo Virtual Business Solutions (short: WinCo VBS)
- Tagline: "Your Business, Organized and Optimized."
- Location: Bridgetown, Barbados. Serves clients worldwide.
- Audience: entrepreneurs, business owners, executives and organizations, many of them on phones.

## Colours: the 60-30-10 rule

Every screen splits its colour roughly like this:

| Share | Role      | What it covers                                                                                     |
| ----- | --------- | -------------------------------------------------------------------------------------------------- |
| 60%   | Primary   | Page backgrounds, large sections, header surface                                                   |
| 30%   | Secondary | CTA buttons, links, cards, nav hover and active states, icons, form focus rings                    |
| 10%   | Accent    | Only the one thing a visitor must not miss: key badges, How We Work step numbers, success messages |

Ink (headings) and body text colours don't count toward the split.

### Palette

| Token                     | Hex       | Share       | Use for                                        |
| ------------------------- | --------- | ----------- | ---------------------------------------------- |
| `--color-primary`         | `#FFFFFF` | 60%         | Page and hero backgrounds, header              |
| `--color-primary-alt`     | `#F4F7FB` | part of 60% | Alternate section backgrounds                  |
| `--color-secondary`       | `#0B63CE` | 30%         | CTA buttons, links, active nav, icons          |
| `--color-secondary-hover` | `#094FA8` | part of 30% | Hover and press on buttons and links           |
| `--color-secondary-tint`  | `#EAF2FC` | part of 30% | Card backgrounds                               |
| `--color-border`          | `#D9E2EF` | part of 30% | Card and input outlines, dividers              |
| `--color-accent`          | `#19BFD0` | 10%         | Badges, step numbers, one highlight per screen |
| `--color-ink`             | `#0B2447` | not counted | Headings, footer background                    |
| `--color-text`            | `#3A4A63` | not counted | Body text                                      |

### Colour rules

1. Never write a hex value in a component. Use the token (`bg-secondary`, `text-ink`, `var(--color-accent)`).
2. One accent element per phone screen. If two accent things compete in the same viewport, move one down to secondary.
3. CTA buttons are secondary blue. Accent is saved for badges, step numbers and success states.
4. Never put accent `#19BFD0` text or thin icons on a white or light background. It only reaches about 2.2:1 contrast. Use navy text on an accent badge, or accent on the navy footer.
5. Don't use the bright logo blue `#0A84FF` for buttons. White text on it is about 3.6:1, which fails. That's why buttons use `#0B63CE`.
6. Grays for borders and muted text come from the primary scale.
7. No dark mode at launch. The tokens make it easy to add later.

### Contrast (target WCAG 2.2 AA)

Text needs 4.5:1 against its background, large text 3:1. These pairs were calculated by hand and still need confirming with axe:

| Pair                                 | Ratio  | Result              |
| ------------------------------------ | ------ | ------------------- |
| Ink `#0B2447` on white               | ~14:1  | Pass                |
| Body `#3A4A63` on white              | ~9:1   | Pass                |
| White on button blue `#0B63CE`       | ~5.7:1 | Pass                |
| White on hover blue `#094FA8`        | ~7.8:1 | Pass                |
| Blue links on `#F4F7FB` or `#EAF2FC` | ~5:1   | Pass                |
| Navy text on accent badge            | ~7:1   | Pass                |
| Accent on navy footer                | ~7:1   | Pass                |
| Accent `#19BFD0` text on white       | ~2.2:1 | Fail, never do this |

## Logo

The logo is a blue-to-cyan "W" mark, navy "WinCo", cyan "V", blue "BS", with "VIRTUAL BUSINESS SOLUTIONS" underneath.

- We're waiting on an SVG or transparent PNG from the client. Until it arrives, use a text placeholder.
- The WhatsApp logo images and the project docx files must never be committed, under any name. `.gitignore` blocks them.
- Full logo in the header and footer. The "W" mark alone is the favicon and the small mobile header icon.
- Header logo at least 40 px tall on phones.
- Alt text: `WinCo VBS, Virtual Business Solutions`.
- Don't stretch, recolour, add shadows to or rotate the logo.
- Logo files go in `public/brand/`. The Logo component lives in `components/brand/`.

## Typography

- One font, loaded with `next/font` (self-hosted, no Google requests at runtime). Ahsan picks it in the design tokens PR.
- Body text at least 16 px. Smaller text makes iOS zoom into form fields.
- Fluid sizes with `clamp()`, not separate overrides at each breakpoint.
- One H1 per page. Headings use `--color-ink`, body uses `--color-text`.

## Spacing and shape

- Corner radius: 8 px.
- Side gutters: 16 px on phones.
- Content max width: about 1200 px.
- Touch targets: at least 44 x 44 px.

## Motion

Every animation lasts between 170 and 240 ms. Use the tokens, never a hard-coded duration.

| Token           | Value  | Typical use                               |
| --------------- | ------ | ----------------------------------------- |
| `--motion-fast` | 170 ms | Touch press, small feedback               |
| `--motion-base` | 200 ms | Nav hover underline, icon lift, hamburger |
| `--motion-slow` | 240 ms | Mobile menu open, header shrink on scroll |

Easing: one curve for everything, `cubic-bezier(0.22, 1, 0.36, 1)`.

- Animate only `transform` and `opacity`. Never width, height, top or margin.
- Nav and UI animations are plain CSS, no JavaScript.
- Wrap hover effects in `@media (hover: hover)` so phones don't get stuck hover states.
- Respect `prefers-reduced-motion`: swap slides and scales for a 170 ms fade, or nothing.
- Text never waits for an animation. The hero shows immediately.

## Icons

- Lucide icons, imported one at a time, drawn with `currentColor`.
- 20 px on desktop, 24 px in the mobile menu. Same stroke width everywhere.
- Icons next to a text label are decorative: `aria-hidden="true"`.

Nav icons:

| Nav item   | Icon      |
| ---------- | --------- |
| Home       | House     |
| About Us   | Users     |
| Services   | Briefcase |
| Contact Us | Mail      |

## Voice and copy

- All copy comes from the client's copy document. It lives in `content/`, never hard-coded in components.
- Use the corrected "Our Vision" wording, not the one in the PDF.
- The About hero text is drafted and needs client approval before launch.
- Keep the client's capitalisation in headings ("Smarter Solutions. Stronger Businesses.").
- Phone numbers and emails are always tap-to-call and tap-to-mail links. WhatsApp uses `https://wa.me/12462690471`.
