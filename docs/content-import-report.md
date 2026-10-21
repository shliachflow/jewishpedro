# Content import report

Source: live pages of jewishpedro.org (read in the browser; nothing edited on the old site). Old pages are under `https://www.jewishpedro.org/templates/articlecco_cdo/aid/<id>/jewish/<name>.htm` (short form `https://www.jewishpedro.org/<id>` also works).

Method: body text was taken from the rendered page text and links/images from the page HTML, then typed into markdown by hand. Words were not changed. "Verbatim confirmed: yes" means every heading, paragraph, list item and link of the article body was carried over, apart from the deliberate omissions listed in the notes column. It does not mean a character-by-character diff was run.

Conventions applied everywhere:
- The old site writes G-d with a non-breaking hyphen (U+2011). I used a plain hyphen: "G-d".
- Frontmatter `title` stays the menu name; `description` is the old page's subtitle/SEO subtitle. Where the old article's first heading is identical to the page title, it is omitted (the layout already prints the title as H1). Other old H1s were demoted to H2.
- Old internal links were rewritten to new paths. Short links `/purim26`, `/seder26`, `/sukkotbrunch`, `/st26`, `/lulav26`, `/bbq` were resolved and replaced by the real GiveLively URLs they redirect to.
- Emoji, "Featured"/"Virtual on Zoom"-style badge text and eyebrow labels from the old layouts were kept as plain lines.

## (a) Pages

| Old URL | New file | Verbatim confirmed | Notes |
|---|---|---|---|
| /templates/articlecco_cdo/aid/6189897/jewish/About-Us.htm | about.md | yes | in-page anchor "About Chabad" now points to `#about-chabad-lubavitch` (the old anchor was broken) |
| …/aid/5188996/jewish/Programs.htm | programs.md | yes | "Page of 2" pager chrome skipped; card background photos are CSS images (not article images), not downloaded |
| …/aid/7031284/jewish/Holidays.htm | holidays.md | yes, except dates | Old per-holiday date lines (Hebrew + Gregorian, all 5786 / 2025–26) omitted; your 5787/5788 table kept. "Learn More" buttons relinked (see links) |
| …/aid/6814996/jewish/Bassies-Challah-Shoppe.htm | bassies-challah-shoppe.md | yes | |
| …/aid/6432368/jewish/Monthly-Planner.htm | monthly-planner.md | yes | |
| …/aid/5189000/jewish/Synagogue-Services.htm | synagogue-services.md | yes | |
| …/aid/5189001/jewish/Adult-Education.htm | adult-education.md | yes | "Explore Shabbat Morning" had no link target on the old page, left as text |
| …/aid/6289961/jewish/Mens-Club.htm | mens-club.md | yes | |
| …/aid/5620925/jewish/Shabbat-Meal.htm | shabbat-meal.md | yes | |
| …/aid/5620928/jewish/Womens-Circle.htm | womens-circle.md | yes | |
| …/aid/5783021/jewish/Shabbat-Experience-Chabad.htm | shabbat-experience.md | yes | tiny "Experience" breadcrumb label above the flyer omitted |
| …/aid/6303794/jewish/Challah-Booth-First-Thursday.htm | challah-booth-first-thursday.md | yes | page is only a flyer image |
| …/aid/5620927/jewish/KidsYouth-Programs.htm | kids-youth-programs.md | yes | |
| …/aid/7331047/jewish/Move-to-Pedro.htm | move-to-pedro.md | yes | in-page buttons `#contact` / `#learn-more` kept via empty anchors; hero stat cards become a 3-cell table |
| …/aid/7425629/jewish/Summer-Raffle.htm | summer-raffle.md | yes | embedded GiveLively widget not copied; link to the hosted form kept |
| …/aid/5386189/jewish/Jewish-Insights-Class.htm | jewish-insights-class.md | yes | |
| …/aid/6189966/jewish/FAQ.htm | faq.md | yes | |
| https://www.chabad.org/library/article_cdo/aid/577994/jewish/Online-Jewish-Resources.htm | online-resources.md | yes | Chabad.org's index of its own sections, rendered as headed link lists; "16 Comments" link skipped |
| /tools/feedback.asp | contact.md | yes | existing contact lines kept; staff and form fields added as text (see below) |
| / (homepage) | home.md | yes | see homepage note |
| /templates/events.htm | src/content/events/*.md | yes | see (c) |

Homepage: `title` is now "Welcome to Chabad S. Pedro"; body is the hero line plus the About paragraph; `featured` has the 7 old items (Move to Pedro, JNet, Chai Society, Weekly Torah Insights, Bassie's Challah Shoppe, The Shabbat Experience, Support Jewish Life) with the old wording. The `start` block ("New here? Start here") is not old-site content and was left as it was. Not copied: the "Learning & Inspiration" and "Daily Thought" blocks (syndicated Chabad.org), the menu, the Facebook box.

Contact: the old form fields are First Name, Last Name, Email Address, Message, an opt-in checkbox ("I would like to receive news and updates from Chabad S. Pedro Jewish Center by email.") and a "SUBMIT »" button. The old contact page lists no staff; the staff names/titles come from About Us: Rabbi Yisroel Shuchat (Founder, Director, and Spiritual Leader) and Rebbetzin Bassie Shuchat (Co-Founder and Program Director).

## (b) Images (all in `public/images/`)

| File | Used in |
|---|---|
| about-rabbi-yisroel.png, about-rebbetzin-bassie.png, about-family.jpg | about.md |
| challah-shoppe-banner.png (resized 5760→2000 px wide), challah-plain.png, challah-everything-but-the-bagel.png, challah-sugar-crumb.png | bassies-challah-shoppe.md |
| planner-purim-flyer.png, planner-seder-flyer.png | monthly-planner.md (flyers link to their GiveLively RSVP pages) |
| adult-education-banner.png | adult-education.md |
| mens-club-banner.png | mens-club.md |
| womens-circle-banner.png | womens-circle.md |
| shabbat-experience-banner.png | shabbat-experience.md |
| move-to-pedro-logo.png, move-to-pedro-shul.jpg and move-to-pedro-rabbi.jpg (both resized to 2000 px wide) | move-to-pedro.md (the wide hero photo is the existing `move-to-pedro.png`) |
| raffle-banner.jpg, raffle-prize-cash.jpg, raffle-prize-airpods.jpg, raffle-prize-challah.jpg | summer-raffle.md |
| chai-society-banner.png | chai-society.md |
| donate-banner.png | donate.md |
| high-holidays-2026-banner.png, high-holidays-message.png | high-holidays-2026-home-page.md (banner also on services, dinner, tashlich pages) |
| high-holidays-2025-banner.png, master-class-rosh-hashanah.png, master-class-yom-kippur.png, master-class-sukkot-simchat-torah.png | high-holidays-master-classes.md (that page still carries the 2025 banner on the old site) |
| chanukah-menorah.png | chanukah.md |
| purim-in-mexico-banner.png | purim-minisite.md |
| passover-seder-banner.png | passover-minisite.md |

Already in the repo and confirmed identical (same dimensions and file size) to the old site's files, so reused rather than re-added: `insights-flyer.png` (Jewish Insights weekly flyer), `challah-booth.png` (challah booth flyer), `move-to-pedro.png`, `shabbat-experience.jpg`, and the homepage tiles `jnet.jpg`, `chai-society.png`, `challah-shoppe.png`, `support.png`, `torah-insights.jpg`.

Not downloaded: the homepage hero slide photo (design background), the Programs page card backgrounds, payment-method icons on the Donate page, the Lag BaOmer/Purim/Passover pages have no photos (emoji only).

## (c) Events

The old Upcoming Events page shows a rolling window of 5; paging forward through the calendar finds 55 occurrences, all the same weekly event, **Shabbat Experience @ Chabad**, 9:45am - 12:15pm, Chabad S. Pedro Jewish Center, 817 W 9th St San Pedro, CA 90731. Created `src/content/events/shabbat-experience-<date>.md` for each (replacing the 5 placeholders): 2026-10-24, 10-31, 11-07, 11-14, 11-21, 11-28, 12-19, 12-26; 2027-01-02, 01-09, 01-16, 01-23, 01-30, 02-06, 02-13, 02-20, 02-27, 03-06, 03-13, 03-20, 03-27, 04-03, 04-10, 04-17, 04-24, 05-01, 05-08, 05-15, 05-22, 05-29, 06-05, 06-19, 06-26, 07-03, 07-10, 07-17, 07-24, 07-31, 08-07, 08-14, 08-21, 08-28, 09-04, 09-11, 09-18, 09-25, 10-09, 10-30, 11-06, 11-13, 11-20, 11-27, 12-04, 12-11, 12-18. No rsvpUrl (the old events have none; "More information" goes to the Shabbat Experience page). The description is the old text split into its three parts as a list.

No other event type is on the old calendar. Dated one-off events exist only inside the holiday mini-pages (all past, see (d)); I did not turn those into event files because they are expired.

## (d) Out of date / inconsistent on the old site

- **Summer Raffle**: drawing July 30; the page is still live in the menu in October 2026.
- **High Holidays 2026 pages** (home, services, community dinner, tashlich): Rosh Hashanah Sept 11–13, Yom Kippur Sept 20–21, 2026 are past. Services page still says the online sign-up link "is coming soon".
- **High Holidays Master Classes**: 2025 banner, classes on 9/16, 9/25, 9/30 (2025 dates) while the other High Holiday pages are 2026.
- **Sukkot & Simchat Torah**: Sept 25–Oct 4, 2026, past (RSVP dates, lulav order deadline Sept 22).
- **Chanukah page**: titled "Chanukah 2025", Dec 14–22, 2025; RSVP link goes to the 2025 event. The page's own Dec 2026 dates are not there.
- **Purim minisite** (March 3, 2026), **Passover minisite** (April 1, 2026), **Lag BaOmer** (May 5, 2026): all past.
- **Monthly Planner**: "Last updated: 2/22/26", showing only the Purim and Seder flyers.
- **Holidays page**: per-holiday cards show 5786 dates (Rosh Hashanah Sept 22-24, 2025 … Shavuot May 22-24, 2026); its Learn More buttons for Rosh Hashanah/Yom Kippur lead to the 2026 High Holidays page. Replaced by your table in the new file.
- **Addresses**: street/shul address 817 W 9th St, San Pedro, CA 90731; mailing/check address 1536 W 25th St #614, San Pedro, CA 90732 (About Us, Donate). Both appear consistently, as two different addresses. The FAQ says the shul space was secured "As of December 2024".
- **Emails**: info@jewishpedro.org on most pages, rabbi@jewishpedro.org on Move to Pedro.
- **Raffle** lists "Raffle - Chabad S. Pedro, 817 W 9th St" as the mail-in address (street address, not the mailing address).
- **Broken links**: FAQ "One-on-One Learning with the Rabbi" points to old article 5380490, which now returns "Page Not Found"; relinked to `/adult-education`. The FAQ "Quick Navigation" and "Back to top" links used `#top`; `#` is used now. Shabbat Experience's "Learn More About Our Services" goes to the Contact page (old article 5188995), kept as written (relinked to `/contact`). Lag BaOmer's Chabad.org link `…/holidays/lagbomer` was copied as it appears.
- Old FAQ answers still reference "Providence Hospital" and "Elat Market"; copied as is.
- Move to Pedro says West Harbor "opens in 2026".

## (e) Could not copy

- Embedded widgets: GiveLively donation/RSVP forms on the Donate, Chai Society and Summer Raffle pages ("Give Online", "Complete Your Monthly Donation", "Complete the contribution below"). Headings are kept; the Donate page's "Click Here to Donate Online" button and the raffle's "Open the secure donation page" link point to the GiveLively pages.
- The Donate page's "COPY ADDRESS" / "COPY ZELLE TAG" buttons (UI actions, not content).
- The Lag BaOmer day-counter grid (the numbers 1–49 with 33 highlighted) is design, not copied; its caption text is.
- Interactive features (carousel, accordions) were flattened to plain headings and paragraphs. Collapsed answers on Lag BaOmer were expanded and copied.
- The Chabad.org-hosted "Learn Online" link on the homepage and old article `/1862355` (redirects to jnet.org) are linked directly to https://www.jnet.org/.
- Environment: Node was not installed here, so the build was run with a portable Node 20.18.1; nothing about the repo or tooling changed.

## (f) Pages found on the old site that you didn't list

Added as new files. `site.config.json` nav was not touched, so none of these is in the nav:

| Old URL (aid) | New file |
|---|---|
| 6362316 Chai Society | chai-society.md |
| 6289455 Donate | donate.md |
| 7032701 High Holidays 2026 - Home Page | high-holidays-2026-home-page.md |
| 7032737 High Holidays Services | high-holidays-services.md |
| 7032736 Rosh Hashanah Community Dinner | rosh-hashanah-community-dinner.md |
| 7032738 Tashlich & Shofar @ Averill Park | tashlich-shofar-averill-park.md |
| 7032740 High Holidays Master Classes | high-holidays-master-classes.md |
| 7065023 Sukkot & Simchat Torah | sukkot-simchat-torah.md |
| 7124310 Chanukah | chanukah.md |
| 7260225 Purim Minisite | purim-minisite.md |
| 7260228 Passover Minisite | passover-minisite.md |
| 7348422 Lag BaOmer | lag-baomer.md |

All of the mini-site pages are expired (see (d)); they are in the repo and build, but you may prefer not to link them from the nav. Their repeated mini-site header/footer (contact line, Facebook/Instagram links) was not copied. The mini-site top bar was kept as a one-line link row.

Also seen but not copied: Chabad.org-hosted pages reachable from the old menu (Jewish Practice `/1675888`, Chabad.org library articles) and Chabad.org's own mega-menu.

## Checks

- `npm install && npm run build`: passes, 88 pages (the 55 weekly events account for most of the increase from the original 26).
- `npm run preview`: checked `/about/`, `/bassies-challah-shoppe/` and `/` in a browser; all images resolve under `/jewishpedro/images/…` and load (the homepage tiles below the fold are `loading="lazy"`).
