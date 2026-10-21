# San Pedro Jewish Center website

Static [Astro](https://astro.build) site, deployed to GitHub Pages. Everything center-specific lives in `site.config.json` so the repo can be reused as a template for other Chabad houses.

```
site.config.json        name, address, phone, ZIP, logo, accent color, nav, donate, Shabbos settings
src/content/pages/      one markdown file per page
src/content/events/     one markdown file per event
public/images/          images (reference as /images/name.jpg)
src/styles/global.css   all styling
```

## Add an event

Create `src/content/events/<short-name>.md`:

```md
---
title: Purim Party
date: 2027-03-22          # YYYY-MM-DD, required
time: 5:00pm – 7:30pm     # optional
location: 817 W 9th St    # optional
image: /images/purim.jpg  # optional, file must be in public/images/
rsvpUrl: https://crm.example.com/form/abc   # optional, shown as an embedded form
---
Description in markdown.
```

Upcoming events appear automatically on the homepage and `/events`. Events dated before today are hidden at build time; the site rebuilds daily, so they disappear on their own. Delete the file whenever you like.

## Edit a page

Open `src/content/pages/<page>.md` and edit the text below the `---` block. Frontmatter fields: `title` (required), `description`, `image`, and `formUrl` (embeds a CRM form as an iframe at the bottom of the page). The homepage is `home.md`: its body is the intro text, and `featured` lists the "Get involved" tiles. Use `/path` links (e.g. `[Events](/events)`); the base path is added automatically.

To add a page: create a new `.md` file (the filename is the URL), then add it to `nav` in `site.config.json`.

## Change config

Edit `site.config.json`, then commit. Key settings:

- `shabbos.candleLightingMinutes`: minutes before sunset.
- `shabbos.havdalah`: `{ "method": "degrees" }` uses nightfall (Hebcal default, 8.5° below the horizon). `{ "method": "minutes", "minutes": 50 }` uses a fixed number of minutes after sunset.
- `deploy.site` / `deploy.base`: GitHub Pages origin and sub-path. With a custom domain, set `site` to it and `base` to `""`.

## Deploy

Pushing to `main` builds and deploys through GitHub Actions (`.github/workflows/deploy.yml`). It also rebuilds daily. One-time setup: in the repo, **Settings → Pages → Source: GitHub Actions**.

Local preview: `npm install`, then `npm run dev` (live) or `npm run build && npm run preview`.

## Notes for the Slack bot / AI agents

- Only commit markdown to `src/content/` and images to `public/images/`. No code changes are needed for content updates.
- Write "G-d", never "God".
- Quote any frontmatter value that contains a colon (`description: "Note: like this"`), or the build fails.
- Check the Actions tab after a push; a failed build leaves the previous site live.
