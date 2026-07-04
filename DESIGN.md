# Design

Design system for Juujo, a premium bedding brand. Register: brand (the design is the product). Follows the `impeccable` and `emil-design-eng` standards.

## Scene

A tired buyer at home in the evening, warm lamp light, deciding whether this is the bedding that finally helps them sleep. The store should feel like a calm, warm, premium bedroom at dusk: soft light, tactile texture, quiet confidence. This forces a warm light theme with deep restful dark sections for depth, not a bright clinical white or a cold dark mode.

## Color strategy

Committed warm neutrals carry the surface; one warm accent for action; a deep restful indigo-night for depth bands (hero base, footer, story sections). Never pure `#000`/`#fff`. All values OKLCH, neutrals tinted toward warm.

```css
--night:      oklch(26% 0.038 274);  /* deep restful indigo, dark bands + footer (not black) */
--night-soft: oklch(38% 0.045 278);
--ink:        oklch(24% 0.02 280);   /* primary text */
--muted:      oklch(50% 0.02 285);   /* secondary text */
--paper:      oklch(96.5% 0.011 84); /* page background, warm near-white */
--sand:       oklch(93% 0.02 82);    /* raised surface / subtle panels */
--linen:      oklch(90% 0.026 78);   /* warmer panel */
--clay:       oklch(63% 0.093 52);   /* primary accent: CTAs, price, recommended */
--clay-deep:  oklch(55% 0.098 46);   /* accent hover/active */
--border:     oklch(86% 0.014 80);   /* hairline */
--success:    oklch(60% 0.11 150);
--background: var(--paper);
--foreground: var(--ink);
```

Accent usage stays deliberate (roughly 10 to 20 percent of a view): primary CTA, live price, selected variant ring, the recommended quantity tier. Trust/quiet content stays on neutrals.

## Typography

- Display / headings: **Fraunces** (warm high-contrast serif) for an editorial, premium feel.
- Body / UI: **Inter**.
- Body line length capped 65 to 75ch. Step ratio at least 1.25 between scale steps. Headlines tight-tracked, generous line-height on body.
- No gradient text. Emphasis via weight and size only.

## Layout

- Vary vertical rhythm between sections; avoid uniform padding. Full-bleed warm neutral alternating with deep night bands and lifestyle imagery.
- Product imagery leads; avoid wrapping everything in cards. No identical card grids for categories: use varied sizes, real photography, and generous whitespace.
- No side-stripe borders. Use full hairline borders, background tints, or nothing.

## Motion (emil-design-eng)

Animate only `transform` and `opacity`. UI motion under 300ms, ease-out on entrances, `scale(0.97)` press feedback on buttons, custom curves. Respect `prefers-reduced-motion`.

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--dur-press: 140ms;
--dur-ui: 200ms;
--dur-panel: 260ms;
```

## Components

- **Buttons:** clay primary with white text, `scale(0.97)` on `:active`, 140ms ease-out. Secondary is outline on neutral.
- **Colour swatch:** round chip showing the colour; selected state uses a clay ring plus check, never colour alone.
- **Size selector:** pill buttons; selected has clay border + filled tint; disabled (out of stock) visibly muted.
- **Quantity offer (Buy 1 / 2 / 3):** three stacked selectable rows; the recommended row (Buy 3) carries a clay "Best value" tag and pre-selection; each row shows per-unit price and total, and the saving. This replaces the old free-gift panel.
- **Price:** live, driven by selected variant and quantity tier; compare-at shown struck through in muted.
- **Trust row:** plain icons + short labels (night trial, free shipping, easy returns), not loud badges.

## Bans (must not appear)

Em dashes in copy (and no `--`), gradient text, default glassmorphism, side-stripe accent borders, the hero-metric template, identical icon-heading-text card grids, modal-first patterns, invented certifications or medical claims.
