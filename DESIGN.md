# Design

Visual world for Chabad S. Pedro Jewish Center. Edit styles only in `src/styles/global.css`; colors come from `site.config.json` -> `theme`.

## Homepage (v3)
People first. A big wide-set headline beside a real family photo; the Shabbat timetable as a horizontal board overlapping the hero; a full brass band for the flagship Saturday program with a photo of the shul; Explore (one place photo plus a plain index); the mission statement set large with the Rabbi and Rebbetzin; events on a sand band; a teal "Come visit" band with directions. All photos are set in `src/content/pages/home.md` (heroImage, feature, people, featured[].image), so swapping a photo is a one-line edit.

## What the reference sites taught us
Seen in a real browser: IKAR (calm teal field, this week's events up front), Romemu (a bold graphic device taken from its own logo, "what's happening" column), Sixth & I (saturated color blocks, events as the main event), MemGlobal (collage of real faces), Passion City (huge confident type). Common thread: real people, big type, events first, color used boldly. A flat block with a list is what reads as boring.

## Intent
A warm, modern home for every Jew in a working port town. Clean structure, personal voice. No single thing is pushed on the visitor: the homepage opens with a welcome and a plain timetable for this Shabbat, then an index of everything else.

## Port-town world
Harbor signage and timetables, not nautical decoration. No anchors, ropes, waves or wave dividers. The Shabbat box is a timetable (dotted leaders, tabular numerals). Lists are plain indexes with ruled lines, like a harbor directory.

## Color (from the logo)
- `primary` #004850 deep sea teal. `accent` #d0a858 brass.
- Everything else is derived in CSS from those two: tinted near-black ink, paper, sand, mist, lines. No pure black, no neutral gray.
- Brass is a fill/rule color. For brass text on light backgrounds use `--brass-text` (darkened for contrast).

## Type
- Display and UI: Archivo (variable width axis), heavy and slightly wide for headings.
- Body: Literata, a reading serif, 18px, ~40rem measure.
- Deliberately not Inter, Fraunces or other common defaults.

## Rules we keep
- No identical card grids, no icon tiles, no eyebrow labels above headings, no numbered sections, no gradient text, no glass, no colored side-stripe borders.
- One authored motion moment: the Shabbat timetable rows rise in once, ease-out, disabled for reduced motion.
- Browser surfaces are themed: text selection, focus ring, scrollbar, caret, checkbox accent.
- Contrast: body >= 4.5:1; check any new color pair.

## Images
- No stock or archive images (the old ChabadOne photos were removed). Use only real photos of the community, the shul and the family, the logo, flyers, or deliberately created art.
- Hero photo slot: set `heroImage` (and `heroAlt`) in `src/content/pages/home.md`. The hero then becomes photo-led with a teal overlay for legibility.
- Pages that still use images from the old site (to verify as the center's own): about (rabbi, rebbetzin, family), challah photos, banners, flyers, `move-to-pedro.png`.

## References studied (getdesign.md, via `npx getdesign add <brand>`, read as reference only, not copied)
- Starbucks: color-block page rhythm (hero band, paper, tinted band, deep footer), tinted warm neutrals instead of pure white, one color reserved for one job. We use the same rhythm with the logo's teal and gold.
- Airbnb: photography carries the visual weight (so type stays modest), a single accent, one soft shadow tier, editorial dropdowns. Applies once real photos are in.
- Oura: warm paper with an editorial type pairing. We use a sans display plus a reading serif.
- The catalog has no religious or nonprofit entries, so these inform structure only; the identity comes from the logo and the port town.
