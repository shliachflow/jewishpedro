# Chabad S. Pedro Jewish Center website

Static [Astro](https://astro.build) site, deployed to GitHub Pages. Everything center-specific lives in `site.config.json` so the repo can be reused as a template for other Chabad houses.

```
site.config.json        name, address, phone, ZIP, logo, colors, nav, donate, Shabbos, labels, SEO
src/content/pages/      one markdown file per page
src/content/events/     one markdown file per event
public/images/          images (reference as /images/name.jpg)
src/styles/global.css   all styling (see DESIGN.md)
```

## Add an event

Create `src/content/events/<short-name>.md`:

```md
---
title: Purim Party
date: 2027-03-22          # YYYY-MM-DD, required, no time
time: 5:00pm – 7:30pm     # optional
location: Someone's Backyard   # optional; leave out when it is at the center
image: /images/purim.jpg  # optional, file must be in public/images/
rsvpUrl: https://crm.example.com/form/abc   # optional, shown as an embedded form
---
Description in markdown.
```

Upcoming events appear automatically on the homepage ("Coming up") and `/events` (the next 8, the rest in a "show all" list). Events dated before today are hidden at build time; the site rebuilds daily, so they disappear on their own.

## Edit a page

Open `src/content/pages/<page>.md` and edit the text below the `---` block. Allowed frontmatter fields:

- `title` (required), `description`, `image`
- `formUrl`: embeds a CRM form as an iframe at the bottom of the page
- `contactForm: true`: shows the built-in contact form (see below)
- `layout: index` (ruled list of links, like Programs) or `layout: faq`
- `draft: true`, or `expires: 2027-03-31`: the page is not published (and the file stays for next year). Use these for holiday pages instead of deleting them.

Unknown fields, bad dates and missing images **fail the build** on purpose, so a typo is caught before it goes live. Quote any value containing a colon: `description: "Note: like this"`.

The homepage is `home.md`: its body is the intro text; `accent` is the part of the title shown in brass; `heroImage` / `heroFocus` / `heroFocusMobile` set the hero photo and where it is cropped; `feature`, `featured`, `mission`, `people`, `communityPhoto` and `visitPhoto` fill the sections. Do not delete or rename `home.md`.

Use `/path` links in markdown (e.g. `[Events](/events)`); the base path is added automatically. Images written in markdown get their width and height added at build time.

To add a page: create a new `.md` file (the filename is the URL; do not name one `events`), then add it to `nav` in `site.config.json`.

## Change config

Edit `site.config.json`, then commit. Key settings:

- `theme.primary` / `theme.accent`: the two brand colors; every other color is derived from them. `theme.hero`: `photo` (full-bleed photo, default) or `split`.
- `shabbos`: `candleLightingMinutes`; `havdalah` is `{ "method": "degrees" }` (nightfall, Hebcal's default) or `{ "method": "minutes", "minutes": 50 }`; `services` is the Saturday schedule line shown in the Shabbos box and the visit section.
- `nav` (with `children`), `footerLinks`, `social`, `donate`: menus and links.
- `ui`: the small labels used on the homepage and boxes ("Explore", "Coming up", button text, ...), so a template can be reworded without touching code.
- `seo`: `ogImage` for link previews, `schemaType` for the search-engine structured data.
- `deploy.site` / `deploy.base`: GitHub Pages origin and sub-path. With a custom domain set `site` to it and `base` to `""`.

## Contact form

`/contact` has a built-in form that works on a static site by posting to a form service. One-time setup: create a free form at a service such as [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) that emails the center, then put its URL in `site.config.json` -> `contactForm.endpoint`. If the service needs a key, add it under `contactForm.hiddenFields` (Web3Forms: `{ "access_key": "..." }`). Until an endpoint is set the form is hidden. Spam traps for both services are built in.

## Deploy

Pushing to `main` builds and deploys through GitHub Actions (`.github/workflows/deploy.yml`). It also rebuilds daily. One-time setup: in the repo, **Settings -> Pages -> Source: GitHub Actions**. Pull requests and branches run `.github/workflows/check.yml` (build plus a wording check) so a broken content file is caught before merge. A failed build leaves the previous site live.

Local preview: `npm install`, then `npm run dev` (live) or `npm run build && npm run preview`.

## Notes for the Slack bot / AI agents

- Only commit markdown to `src/content/` and images to `public/images/`. No code changes are needed for content updates. Prefer opening a pull request over pushing straight to `main`.
- Write "G-d", never "God" (CI checks this).
- Images: keep them under about 300 KB (resize to about 1600px wide, JPEG) and use real photos, the logo, or flyers. See `DESIGN.md` for the image policy.
- Check the Actions tab after a push; if the build fails, read the error: it names the file and field.
