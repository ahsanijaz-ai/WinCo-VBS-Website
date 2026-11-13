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

These colours come from the client's brand colour palette (Primary Blue, Teal, Light Blue, Slate, White, Deep Navy). The token names stayed the same when the palette changed, so components didn't need editing. The palette has no light tints or body-text grey, so those are our own neutrals.

| Token                     | Hex       | Brand name       | Share         | Use for                                                                  |
| ------------------------- | --------- | ---------------- | ------------- | ------------------------------------------------------------------------ |
| `--color-primary`         | `#FFFFFF` | White            | 60%           | Page and hero backgrounds, header                                        |
| `--color-primary-alt`     | `#F4F7FB` | (neutral)        | part of 60%   | Alternate section backgrounds                                            |
| `--color-secondary`       | `#1F4FD8` | Primary Blue     | 30%           | CTA buttons, links, active nav, icons                                    |
| `--color-secondary-hover` | `#0B3A6E` | Deep Navy        | part of 30%   | Hover and press on buttons and links                                     |
| `--color-secondary-tint`  | `#EDF1FC` | (neutral)        | part of 30%   | Card backgrounds (Primary Blue mixed with white)                         |
| `--color-border`          | `#D9E2EF` | (neutral)        | part of 30%   | Card outlines, dividers (decorative only)                                |
| `--color-input-border`    | `#7B8798` | (neutral)        | part of 30%   | Form field borders (needs 3:1 on white)                                  |
| `--color-accent`          | `#2EC4B6` | Teal             | 10%           | Badges, step numbers, one highlight per screen                           |
| `--color-accent-strong`   | `#229288` | (Teal, darkened) | part of 10%   | Large text only (24 px+ or 18.7 px bold): the coloured hero heading word |
| `--color-accent-deep`     | `#1B7A71` | (Teal, deep)     | part of 10%   | Teal buttons with white text (5.2:1), e.g. the Contact WhatsApp pill     |
| `--color-accent-tint`     | `#E6F7F5` | (neutral)        | part of 10%   | Pale Teal behind Teal icons                                              |
| `--color-ink`             | `#0F1E2E` | Slate            | not counted   | Headings                                                                 |
| `--color-text`            | `#3A4A63` | (neutral)        | not counted   | Body text                                                                |
| `--color-navy`            | `#0B3A6E` | Deep Navy        | dark surfaces | Footer background                                                        |
| `--color-light-blue`      | `#38BDF8` | Light Blue       | dark surfaces | Highlights on the navy footer only                                       |
| `--color-error`           | `#B42318` | (functional)     | not counted   | Form error text and error borders only                                   |

Note on names: the client calls `#1F4FD8` "Primary Blue", but in our tokens "primary" means the 60% background (white). In code, Primary Blue is `secondary`.

### Colour rules

1. Never write a hex value in a component. Use the token (`bg-secondary`, `text-ink`, `bg-navy`, `var(--color-accent)`).
2. Teal is the only accent. One accent element per phone screen. If two accent things compete in the same viewport, move one down to secondary. Soft Teal tints in decorative shapes (25 % opacity or less) do not count as an accent element.
3. CTA buttons are Primary Blue (`secondary`). Teal is saved for badges, step numbers and success states.
4. Never put Teal `#2EC4B6` or Light Blue `#38BDF8` text or thin icons on a white or light background. Both only reach about 2.2:1. Use Slate text on a Teal badge, or Teal and Light Blue on the navy footer. For large Teal text (24 px or bigger, or 18.7 px bold) use `--color-accent-strong` `#229288` (about 3.8:1 on white, 3.5:1 on `#F4F7FB`). It is outside the client palette and is never used for body text.
5. Light Blue is for dark backgrounds only (footer highlights, small decorative details). It never counts as a second accent on light pages.
6. The footer is Deep Navy (`bg-navy`) with white text. Footer links are white and turn Teal on hover. Icons and focus rings in the footer are Teal, because Primary Blue on navy is only about 1.7:1.
7. Grays for borders and muted text come from the neutral tokens above.
8. No dark mode at launch. The tokens make it easy to add later.

### Contrast (target WCAG 2.2 AA)

Text needs 4.5:1 against its background, large text 3:1. Focus rings and other UI parts need 3:1. These pairs were calculated by hand and still need confirming with axe:

| Pair                                                  | Ratio           | Result                                           |
| ----------------------------------------------------- | --------------- | ------------------------------------------------ |
| Slate `#0F1E2E` headings on white                     | ~16.9:1         | Pass                                             |
| Body `#3A4A63` on white                               | ~9:1            | Pass                                             |
| Body `#3A4A63` on `#F4F7FB` or `#EDF1FC`              | ~8:1            | Pass                                             |
| White on Primary Blue `#1F4FD8` (buttons)             | ~6.6:1          | Pass                                             |
| White on Deep Navy `#0B3A6E` (hover)                  | ~11.4:1         | Pass                                             |
| Primary Blue links on `#F4F7FB` / `#EDF1FC`           | ~6:1            | Pass                                             |
| Slate text on a Teal badge                            | ~7.8:1          | Pass                                             |
| White text on the navy footer                         | ~11.4:1         | Pass                                             |
| Teal on the navy footer                               | ~5.3:1          | Pass                                             |
| Light Blue on the navy footer                         | ~5.3:1          | Pass                                             |
| Primary Blue focus ring on white                      | ~6.6:1          | Pass                                             |
| Primary Blue on the navy footer                       | ~1.7:1          | Fail, use Teal                                   |
| Slate vs Primary Blue (active nav colour)             | ~2.5:1          | Not enough alone, make the active label bold too |
| Input border `#7B8798` on white                       | ~3.65:1         | Pass (form fields need 3:1)                      |
| Light border `#D9E2EF` on white                       | ~1.3:1          | Decorative only, never for form fields           |
| Error `#B42318` text on white or `#F4F7FB`            | ~6.6:1 / ~6.1:1 | Pass                                             |
| Strong Teal `#229288` large text on white / `#F4F7FB` | ~3.8:1 / ~3.5:1 | Pass for large text only, fails body text        |
| White on deep Teal `#1B7A71` (buttons)                | ~5.2:1          | Pass                                             |
| Teal `#2EC4B6` text on white                          | ~2.2:1          | Fail, never do this                              |
| Light Blue `#38BDF8` text on white                    | ~2.1:1          | Fail, never do this                              |

## Logo

The logo is a blue-to-cyan "W" mark, navy "WinCo" and a teal-to-blue "VBS". The logo images the client sent are JPGs with a white or grey background, so the SVG files below were rebuilt from them as vectors. If the client sends the original SVG, replace these files and keep the names.

| File                                                    | What it is                                                 | Used for                          |
| ------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------- |
| `public/brand/logo.svg`                                 | The W mark plus "WinCo VBS" (no tagline), about 7.3:1 wide | Header from 768 px                |
| `public/brand/logo-mark.svg`                            | The W mark alone, about 2.2:1 wide                         | Header under 768 px               |
| `public/brand/logo-white.svg`                           | Same wordmark with white "WinCo"                           | Footer (navy background)          |
| `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png` | The W mark on a white tile                                 | Browser tab and home-screen icons |

- The `Logo` component (`components/brand/Logo.tsx`) is the only place the files are used. Never use the files directly in a page.
- The full wordmark is too wide for a phone, so under 768 px the header shows the W mark alone, 40 px tall. From 768 px it shows the wordmark, 24 px tall, and 36 px tall from 1280 px.
- Never commit the JPG logo images, the WhatsApp images or the project docx files, under any name. `.gitignore` blocks them.
- Alt text: `WinCo VBS, Virtual Business Solutions`.
- Don't stretch, recolour, add shadows to or rotate the logo. The navy "WinCo" disappears on a navy background, so the footer uses `logo-white.svg` (`<Logo tone="dark" />`).
- The logo files are 15% more saturated than the client's original JPGs (for example navy `#0B3589` became `#023292`). This was approved on purpose in PR #12 for a sharper look on screen. Don't change the colours again.
- Logo files go in `public/brand/`. The Logo component lives in `components/brand/`.
- The client's logo images also include a version with "VIRTUAL BUSINESS SOLUTIONS" underneath. It is not in the site yet: at header size the tagline would be unreadable.

## Typography

- One font, loaded with `next/font` (self-hosted, no Google requests at runtime). Ahsan picks it in the design tokens PR.
- Body text at least 16 px. Smaller text makes iOS zoom into form fields.
- Fluid sizes with `clamp()`, not separate overrides at each breakpoint.
- One H1 per page. Headings use `--color-ink`, body uses `--color-text`.

## Spacing and shape

- Corner radius: 8 px. One exception: the Contact hero button is a pill (fully rounded) with a Primary Blue gradient and the arrow in a light circle (`<Hero buttonStyle="pill" />`). Every other button keeps 8 px. The Contact "Get in Touch" cards also follow their design: 24 px card corners, 16 px icon tiles and pill buttons. The Contact form follows its design too: a 24 px card, 12 px field corners with a small icon tile inside each field, and a 16 px-corner "Send Inquiry" button. Field borders stay `--color-input-border` (3:1), placeholders stay at least 4.5:1, labels always stay visible above the field, and focus shows a Primary Blue border with a soft glow instead of the global outline. After a successful submit the form is replaced by a success panel: the logo with "Virtual Business Solutions" between two lines, then a blue-to-Teal tinted panel with a deep Teal check in a pale Teal circle, the heading, the confirmation from the copy and a short note. Focus moves to its heading. Country and Service use a custom dropdown (`SelectField`): the field shows the icon tile, a divider, the value and a chevron that flips when open. The list opens in a rounded panel at most 288 px tall that always stays inside the form (it opens upward when there is more room above), with option icons for services and a Primary Blue bar, light tint and check badge on the chosen option. It keeps full keyboard support (arrows, Home, End, Page Up/Down, Enter, Space, Escape, type-to-jump) and submits through a hidden input like a normal select.
- Side gutters: 16 px on phones.
- Content max width: about 1200 px.
- Touch targets: at least 44 x 44 px.

## Motion

Every UI-feedback animation (hover, press, menu) lasts between 170 and 240 ms. Use the tokens, never a hard-coded duration.

| Token            | Value      | Typical use                                                     |
| ---------------- | ---------- | --------------------------------------------------------------- |
| `--motion-fast`  | 170 ms     | Touch press, small feedback                                     |
| `--motion-base`  | 200 ms     | Nav hover underline, icon lift, hamburger                       |
| `--motion-slow`  | 240 ms     | Mobile menu open, header shadow on scroll                       |
| `--motion-enter` | 220 ms     | Contact hero fade-up on page load                               |
| `--motion-hover` | 180 ms     | Call-to-action hover lift and arrow slide (Contact hero button) |
| `--reveal-*`     | 780–950 ms | Scroll reveal of page content (see below)                       |

Easing: one curve for UI feedback, stored as `--ease-brand: cubic-bezier(0.22, 1, 0.36, 1)`. Use the token, never write the curve in a component. The two exceptions are the Contact hero fade-up and the call-to-action hover, which use plain `ease-out` as specified for them.

### Scroll reveal

Page content reveals as it scrolls into view, through the shared `Reveal` family in `components/ui/Reveal.tsx`: one `<Reveal>` per section, with the pieces below inside it. This is content entering the page, not UI feedback, so it runs slower than 170-240 ms and has its own tokens in `app/globals.css`.

| Piece         | What it does                                                | Token                                                  |
| ------------- | ----------------------------------------------------------- | ------------------------------------------------------ |
| `RevealWords` | Heading words rise from behind a mask, one after another    | `--reveal-dur-word` 850 ms                             |
| `RevealClip`  | Subtitle or lead paragraph wipes in from left to right      | `--reveal-dur-clip` 900 ms                             |
| `RevealLine`  | Divider draws in from the left                              | `--reveal-dur-line` 900 ms                             |
| `RevealIcon`  | Icon springs in; strokes of an outlined SVG draw themselves | `--reveal-dur-icon` 780 ms, `--reveal-dur-draw` 950 ms |
| `RevealFade`  | Text, cards, rows and buttons fade up                       | `--reveal-dur-text` 780 ms                             |

- Blocks entering together start one after another, `--reveal-stagger` (110 ms) apart, in page order.
- Easing: `--ease-reveal-out`, `--ease-reveal-in-out` and `--ease-reveal-spring`, not `--ease-brand`.
- After `--reveal-settle` (1700 ms) the entrance transitions are removed, so hover is never delayed.
- A block replays its entrance if it fully leaves the screen and comes back.
- Without JavaScript, or with reduced motion, nothing is hidden: content shows in its final state at once.
- The hero is exempt: its text never waits for an animation.

### Hover on content

Two content hovers run longer than 240 ms on purpose: they are decorative fills, not feedback. Home, Contact and Services all use them, so reuse these rather than adding new ones.

- Card fill: a circle wipe from the bottom-left, 550 ms on `--ease-brand` (`.svc-card` and `.contact-card` in globals.css). Keyboard focus shows the same fill.
- Row polish (`RevealUnit` with `hoverGroup`): the divider turns Primary Blue, the text turns Primary Blue and shifts 3 px, the icon lifts (350-600 ms).
- Hover rules written in plain CSS go inside `@media (hover: hover)`, so a tap on a phone never leaves a card or row looking hovered. Keyboard focus rules stay outside it.

- Animate mostly `transform` and `opacity`. Fades of colour, background colour and shadow are allowed too. Never animate width, height, top or margin.
- Nav and UI animations are plain CSS, no JavaScript.
- Use Tailwind's `hover:` classes for hover effects. In Tailwind v4 they only apply on devices that can hover, so phones don't get stuck hover states. If you write hover styles in plain CSS, wrap them in `@media (hover: hover)`.
- Respect `prefers-reduced-motion`: swap slides and scales for a 170 ms fade, or nothing.
- Text never waits for an animation. The hero shows immediately. One exception: on the Contact page the illustration, heading and description fade up 8 px once on load (`motion-safe:animate-fade-up`, 220 ms, no stagger), so the text is in place within 220 ms.
- Contact hero button hover: lift 2 px with a slightly stronger shadow, and the arrow slides 4 px, in 180 ms ease-out (`ctaLiftClassName` in `components/ui/button-styles.ts`). Hover devices only; touch screens keep the press feedback. The navbar consultation button has its own magnetic hover (`NavCta`, see `components/layout/navbar.css`).
- Services: the four hero tiles fade up 12 px one after another on load (220 ms each, 60 ms apart, only without reduced motion); the hero text itself shows at once. Each service group uses the same scroll reveal as Home: the glyph pops in, the heading rises word by word, the subtitle wipes in, and the six rows fade up with their dividers and outlined icons drawing in. Rows and tiles use the content hovers above. The group navigator changes colour in 200 ms, and its progress bar follows the scroll directly, with no transition.
- Contact "Get in Touch" and form sections use the same scroll reveal as Home: the wave pops in (`RevealIcon`), the heading rises word by word with its last word in strong Teal (`RevealWords` with `lastWordClassName`), the subtitle wipes in (`RevealClip`), the two cards fade up one after another (`RevealFade`) with their icons popping in, and the location line follows. The form card fades up with its heading rising word by word. On top of that, the two cards use the Home card hover: they fill with their own colour (Primary Blue or deep Teal) in a circle wipe from the bottom-left (550 ms, `.contact-card` in globals.css), the icon tile, title and text turn white and the pill flips to white with the card colour as text. Keyboard focus inside a card shows the same fill. Cards also lift 4 px with a stronger shadow (200 ms, brand curve), and the Email and WhatsApp buttons grow to 1.02 and darken slightly on hover (180 ms ease-out) and shrink to 0.98 when pressed.
- About page: the same building blocks as Contact. A centred animated hero with a team illustration (on load the blob grows in, the back person's outline draws itself, the front person rises, then both bob gently twice and stop, under 5 s in total so no pause control is needed; on hover the blob swells, the two people lift and lean toward each other and the back person tints, 240 ms on hover devices only; nothing moves with reduced motion) and the pill button; the story with the heading in the Home section heading size (`text-section-heading`, like "Why WinCo VBS?"), the first paragraph as a lead statement with a single Primary Blue bar that fills as you scroll down through it and empties as you scroll back up (`ScrollProgressBar`, transform only, full and still with reduced motion) and the other paragraphs as alternating cards (light blue with a blue icon and Teal divider, then white with a Teal icon and blue divider; on phones the icon sits above the text); Mission and Vision cards with the `.contact-card` colour fill on hover (blue, deep Teal); "Our Approach" with a small brand mark (two slanted bars, Primary Blue and Teal), the heading in the Home section heading size with its last word in strong Teal, a thin divider and the two paragraphs with rounded icon tiles (blue target, Teal handshake) on soft blue corner waves; and a closing tagline band on the wave background. Sections are as tall as their content, like Home, and use the Home scroll reveal.

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
