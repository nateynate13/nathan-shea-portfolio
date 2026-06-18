# CLAUDE.md — Nathan Shea Portfolio

## Project Overview

Personal portfolio for Nathan Shea (nathan-shea.com), built as a vanilla JS single-page app with no framework and no build step. All logic lives in `main.js`, styles in `as7.css`, and static content in `data.json`. Dynamic content (books, news, projects, reading goals) is stored in Supabase and merged at runtime with the static data. Hosted on GitHub Pages via CNAME; a GitHub Actions workflow runs hourly to refresh `spotify-data.json`. There is no `package.json` — the site runs directly in the browser using ES modules.

---

## File Structure

```
/
├── index.html              Entry point — minimal shell, loads main.js + as7.css
├── main.js                 Entire app: routing, rendering, Supabase calls, Spotify
├── as7.css                 All styles + 3 CSS-variable-based themes
├── data.json               Static content: nav, about, news, projects, reading list
├── spotify-data.json       Cached Spotify data (written hourly by GitHub Actions)
├── CNAME                   Custom domain: nathan-shea.com
├── .glitchdotcom.json      Glitch static-site config (appType: static, no build)
├── .nojekyll               Disables Jekyll on GitHub Pages
│
├── js/
│   ├── config.js           Supabase URL + anon key
│   └── supabaseClient.js   Creates + exports the Supabase client
│
├── api/
│   ├── update-spotify-data.js    Node script run by GitHub Actions to refresh Spotify
│   └── get-refresh-token.js      One-time OAuth helper for Spotify setup
│
├── admin/
│   ├── login.html          Supabase email/password auth
│   ├── index.html          Redirects to /?page=admin
│   ├── add-book.html       Add a book to Supabase
│   ├── edit-book.html      Edit an existing Supabase book
│   ├── add-news.html       Add a news item
│   ├── edit-news.html      Edit a news item
│   ├── add-project.html    Add a project
│   ├── edit-project.html   Edit a project
│   └── edit-goal.html      Edit annual reading goal
│
├── assets/                 All images, logos, PDFs
│   ├── portfolio_headshot.jpg    Current profile photo (full-body portrait)
│   ├── nate_headshot.jpeg        Old headshot (unused)
│   ├── email_icon.jpg / linkedin_logo.jpg   Contact button icons
│   ├── {project-name}.png/.jpg   Project logos and photos
│   └── {book-slug}.jpg           Book cover images
│
└── github/workflows/
    └── update-spotify.yml  Cron job: runs update-spotify-data.js every hour
```

---

## Where to Edit What

| Task | Where |
|------|--------|
| Update bio, location, name | `data.json` → `about` object |
| Change profile photo | `data.json` → `about.image`, drop new file in `assets/` |
| Add/remove typewriter roles | `main.js` → `TYPEWRITER_ROLES` array (top of file) |
| Add a life phase to the timeline | `main.js` → `PHASES` array (top of file) |
| Update a phase's dates | `main.js` → `PHASES` array |
| Add a static news item | `data.json` → `news` array |
| Add a dynamic news item | Admin panel (`/?page=admin`) or `admin/add-news.html` |
| Add a static project | `data.json` → `projects` array; drop images in `assets/` |
| Add a dynamic project | Admin panel or `admin/add-project.html` |
| Add a book to the reading list | `data.json` → `readingList` array (static) OR admin panel (Supabase) |
| Update reading goal for a year | Admin panel → reading goals section |
| Update nav links | `data.json` → `navigation` array |
| Change theme colors | `as7.css` → CSS custom property blocks (search `[data-theme="bc"]`) |
| Edit About section layout/HTML | `main.js` → `renderAbout()` function |
| Edit Now/countdown widget | `main.js` → `renderNowSection()` + `renderCountdownWidget()` |
| Edit homepage section order | `main.js` → `renderMain()` (controls section render sequence) |
| Change Spotify integration | `api/update-spotify-data.js` + `github/workflows/update-spotify.yml` |

---

## Data Shapes

### Phase (PHASES array, `main.js` top)
```js
{ name: "Boston Post Grad 🏙️", start: "2026-07-17", end: "2028-07-17" }
// Dates: "YYYY-MM-DD" strings. computePhases() enriches at runtime with
// isCurrent, daysRemaining, percentComplete, startsIn.
```

### Navigation item (`data.json`)
```json
{ "text": "Library", "href": "?page=library", "key": "library", "class": "nav-library" }
// key and class are optional. External links use "target": "_blank" instead of key.
```

### About contact item (`data.json`)
```json
{ "type": "Email", "value": "fornateshea@gmail.com", "icon": "assets/email_icon.jpg", "link": "mailto:fornateshea@gmail.com" }
// type "Email" gets clipboard pill button; anything else gets plain anchor.
// LinkedIn: type "LinkedIn", value "LinkedIn" (display label), link is full URL.
```

### News item (`data.json` or Supabase)
```json
{ "title": "Graduated from Boston College 🎓", "date": "2026-05-18", "content": "Long text..." }
// date: "YYYY-MM-DD". Supabase items also have "id". Merged: Supabase first, then static.
```

### Project (`data.json` or Supabase)
```json
{
  "title": "ClearFeed — BC Shea Center Accelerator",
  "short_description": "One or two sentences shown on card.",
  "link": "clearfeed.html",
  "details": {
    "title": "Full page title",
    "description": "Multi-paragraph string. Use \\n\\n for paragraph breaks.",
    "technologies": ["Python", "Flask", "OpenAI GPT"],
    "logos": [
      { "alt": "ClearFeed Logo", "src": "assets/Clearfeed_logo.png" },
      { "alt": "Demo Day", "src": "assets/demoday_photo1.JPG", "style": "width: 300px;" }
    ],
    "back_link": "index.html"
  }
}
// logos[].style and logos[].link are optional.
// link field is used as the URL slug: /?project=clearfeed.html
```

### Reading list item (`data.json` → `readingList`)
```json
{
  "slug": "liars-poker",
  "title": "Liar's Poker",
  "author": "Michael Lewis",
  "published": "1989",
  "finished": "December 2025",
  "cover": "assets/liars_poker.jpg",
  "summary": "Short description shown on card.",
  "rating": 4.5,
  "review": "Optional longer review.",
  "reflection": "Optional personal reflection.",
  "pinned": false,
  "pdf": null
}
// finished: use "Month YYYY" format, or "not finished", or "re-read Month YYYY"
// tags are NOT in data.json — generated at runtime from a BOOK_TAGS mapping in main.js
// Supabase books use cover_url (full URL) instead of cover (relative path)
```

### Spotify data (`spotify-data.json`)
```json
{
  "currentTrack": { "trackName": "...", "artist": "...", "album": "...", "albumArt": "URL", "spotifyUrl": "URL", "isPlaying": true },
  "recentTracks": [{ "trackName": "...", "artist": "...", "playedAt": "ISO 8601", ... }],
  "lastUpdated": "ISO 8601"
}
```

---

## Conventions

- **Dates:** Always `"YYYY-MM-DD"` in PHASES and news items. Reading `finished` uses `"Month YYYY"` prose form.
- **Asset paths:** Relative from root — `"assets/filename.ext"`. No leading slash.
- **Asset naming:** Book covers use `slug_form.jpg` (underscores). Project assets use camelCase or descriptive names. Extensions vary (.jpg/.JPG/.PNG/.png — case matters on Linux).
- **Multi-paragraph strings:** Use `\n\n` as paragraph separator in JSON. `renderAbout()` splits on `\n\n`; project descriptions render pre-formatted.
- **Emojis in phase names:** Intentional and expected — the countdown widget renders them as-is.
- **Project `link` field:** Used as the URL slug (`?project=VALUE`). Historically looks like a filename (`clearfeed.html`) but functions as an ID string.
- **Supabase vs. static merge:** Supabase items are always prepended (appear first). Static data.json items are the fallback.

---

## Gotchas

1. **Two data sources for books, news, and projects.** Supabase is the "live" source; data.json is the static fallback. Edits to data.json won't affect items that already exist in Supabase — they'll still show up from Supabase first. To truly remove an item, you must delete it from Supabase via the admin panel.

2. **Graduation countdown auto-hides.** `renderNowSection()` has a hardcoded check: `today < new Date("2026-05-18")`. After that date, the graduation progress bar disappears entirely with no other change needed.

3. **Book tags not in data.json.** Tags shown on book cards come from a `BOOK_TAGS` mapping inside `main.js`. If you add a book and want tags, you need to add an entry to that map in main.js.

4. **Admin tab is invisible until auth check resolves.** `checkIsAdmin()` is non-blocking; the nav tab only appears after Supabase confirms the user is in the `admins` table. Normal users never see it.

5. **Asset filenames are case-sensitive.** The repo has `.JPG`, `.PNG`, `.jpg` mixed. The exact case in `data.json` or `main.js` must match the actual file on disk.

6. **No build step = no error at "compile time".** A typo in `data.json` or a bad asset path will silently fail or break only that section. Check the browser console.

7. **`spotify-data.json` is committed to the repo** and updated by GitHub Actions. Don't hand-edit it — it'll be overwritten on the next hourly run.

8. **Phase navigation has no wraparound.** The prev/next arrows in the countdown widget stop at the first/last phase; there's no looping.

---

## Common Tasks

### Add a life phase to the timeline
Edit `PHASES` array at the top of `main.js`. Append or insert a new object:
```js
{ name: "New Role 🏢", start: "2028-07-18", end: "2030-06-01" }
```
Keep chronological order. Dates are `"YYYY-MM-DD"` strings.

### Update "now" section text (the subtext under heading)
In `main.js` → `renderCountdownWidget()`, find `<p class="now-subtext">` and edit inline.

### Add a news item (static)
In `data.json` → `news` array, prepend:
```json
{ "title": "Your headline", "date": "2026-08-01", "content": "Full text here." }
```
Static news shows after Supabase news. For it to appear first, add via admin panel instead.

### Add a project
1. Drop any images into `assets/`
2. In `data.json` → `projects` array, prepend a full project object (see Data Shapes above)
3. The `link` field becomes the URL slug — keep it unique and URL-safe

### Update the About bio or location
Edit `data.json` → `about`. The `bio` field supports `\n\n` for paragraph breaks (each becomes a separate `<p>` tag in `renderAbout()`).

### Change the profile photo
1. Drop new image into `assets/`
2. Update `data.json` → `about.image` to `"assets/new-filename.jpg"`
3. The photo renders full-size in a portrait card — no cropping applied; vertical images work best.

### Add a typewriter role
Edit `TYPEWRITER_ROLES` array near the top of `main.js`. Just append a string to the array.

### Change theme accent colors
In `as7.css`, find the theme block you want (e.g., `[data-theme="bc"]`) and update `--accent` and `--accent-rgb`. The RGB version must stay in sync with the hex for transparency effects to work (e.g., `#8A1538` → `138, 21, 56`).
