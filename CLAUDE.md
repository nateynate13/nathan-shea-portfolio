# CLAUDE.md — Nathan Shea Portfolio

## Project Overview

Vanilla JS single-page application with zero build step. All routing and rendering happens in `main.js` using URL query parameters. Content has two sources: `data.json` (static, lives in the repo) and Supabase (dynamic CMS, managed via the admin panel at `?page=admin`). At runtime, Supabase content is fetched and merged with static content — Supabase rows appear first. The site is hosted on GitHub Pages at `nathan-shea.com` (CNAME configured). Spotify "now playing" data is updated hourly by a GitHub Actions workflow that rewrites `spotify-data.json` and commits it.

---

## File Structure

```
index.html              # Minimal HTML shell — loads as7.css and main.js, nothing else
main.js                 # Everything: routing, all render functions, data fetching (~2542 lines)
as7.css                 # All styles (~2448 lines) — no preprocessor, plain CSS
data.json               # Static content: navigation, about, news, projects, readingList
spotify-data.json       # Auto-updated hourly by GitHub Actions; don't edit manually

js/
  config.js             # Supabase URL + anon key
  supabaseClient.js     # Initializes and exports the Supabase client

assets/                 # All images, logos, book covers, PDFs — referenced as assets/filename
admin/                  # Standalone HTML pages for the admin CMS (Supabase auth required)
  index.html            # Admin dashboard
  add-book.html / edit-book.html
  add-news.html / edit-news.html
  add-project.html / edit-project.html
  edit-goal.html        # Set annual reading goal count in Supabase

api/
  update-spotify-data.js   # Fetches Spotify data and writes spotify-data.json
  spotify-now-playing.js   # OAuth helper
  get-refresh-token.js     # One-time OAuth setup

github/workflows/
  update-spotify.yml    # Cron job: runs api/update-spotify-data.js every hour

CNAME                   # "nathan-shea.com" — GitHub Pages custom domain
patches/                # Old patch files — ignore
main.js.bak             # Backup artifact — ignore
data.json.rej           # Patch rejection artifact — ignore
new/                    # Empty placeholder directory — ignore
```

---

## Where to Edit What

| Task | Where |
|---|---|
| Update name, bio, position, location, photo | `data.json` → `about` object |
| Add/remove a nav link | `data.json` → `navigation` array |
| Add a life phase to the timeline | `main.js` → `PHASES` array (top of file, ~line 1) |
| Update "Now" widget text (learning/reading/wrestling) | `main.js` → `renderNowPage()` (~line 1518) |
| Add a news item (simple) | `data.json` → `news` array — prepend, most recent first |
| Add a news item (via CMS) | Admin panel → `?page=admin` → Add News |
| Add a project (simple) | `data.json` → `projects` array — add entry, drop images in `assets/` |
| Add a project (via CMS) | Admin panel → `?page=admin` → Add Project |
| Add a book to the reading list | `data.json` → `readingList` array + add slug to `BOOK_TAGS` in `main.js` |
| Add a book (via CMS) | Admin panel → Add Book (Supabase only; tags handled separately in `BOOK_TAGS`) |
| Set the annual reading goal | Admin panel → Edit Goal (writes to Supabase `reading_goals` table) |
| Change Stoic quotes | `main.js` → `STOIC_QUOTES` constant (~line 35) |
| Change typewriter roles | `main.js` → `TYPEWRITER_ROLES` constant (~line 12) |
| Add/change book category tags | `main.js` → `BOOK_TAGS` object (~line 51) — keyed by book slug |
| Change styles | `as7.css` |
| Add/replace an image or logo | Drop file into `assets/`, reference as `assets/filename.ext` |
| Spotify widget | Don't touch — auto-updated by GitHub Actions |

---

## Data Shapes

### Life Phase (`PHASES` in `main.js`)
```js
{ name: "Summer Break ☀️", start: "2026-05-19", end: "2026-06-23" }
```
Dates are ISO `YYYY-MM-DD`. Phases are ordered chronologically in the array. The widget auto-detects the current phase by date. If two phases share a boundary date, the later start date wins.

### News Item (`data.json → news[]`)
```json
{
  "title": "Graduated from Boston College 🎓",
  "date": "2026-05-18",
  "content": "Full text paragraph shown under 'Show More'."
}
```
Date is ISO `YYYY-MM-DD`. Array is sorted by date descending at runtime, but keep it in order anyway. Only the first 5 items appear on the home page.

### Project (`data.json → projects[]`)
```json
{
  "title": "ClearFeed — BC Shea Center Accelerator",
  "short_description": "One sentence shown on the project card.",
  "link": "clearfeed.html",
  "details": {
    "title": "ClearFeed — Full Page Title",
    "description": "Long-form text. Use \\n\\n for paragraph breaks.",
    "technologies": ["Python", "ElevenLabs TTS", "OpenAI GPT"],
    "logos": [
      { "alt": "ClearFeed Logo", "src": "assets/clearfeed_logo.png" },
      { "alt": "Demo Day", "src": "assets/clearfeed_demo1.jpg", "link": "https://optional.com", "style": "width: 300px;" }
    ],
    "back_link": "index.html"
  }
}
```
`link` is the value used in `?project=<link>` — must be unique. Home page shows first 4 projects; all projects page shows all.

### Book (`data.json → readingList[]`)
```json
{
  "slug": "liars-poker",
  "title": "Liar's Poker",
  "author": "Michael Lewis",
  "published": "1989",
  "finished": "December 2025",
  "cover": "assets/liars_poker.jpg",
  "summary": "One-paragraph summary shown on library card.",
  "rating": 4.5,
  "review": "Personal review text.",
  "reflection": "Short reflection (shown if review is empty).",
  "pinned": true,
  "pdf": "assets/echo_passage.pdf"
}
```
`finished` format is `"Month YYYY"` (e.g., `"May 2026"`). Books with `"not finished"` anywhere in the `finished` field are excluded from reading goal counts. `pinned` and `pdf` are optional. `slug` must also exist as a key in `BOOK_TAGS` in `main.js` for category filtering to work.

### Navigation Item (`data.json → navigation[]`)
```json
{ "text": "Projects", "href": "?page=projects", "key": "projects", "class": "nav-projects" }
{ "text": "Resume", "href": "https://...", "target": "_blank" }
```
`key` is used to highlight the active nav item. External links use `target: "_blank"`.

### About (`data.json → about`)
```json
{
  "name": "Nathan Makaneole Shea",
  "position": "Senior at Boston College",
  "location": "Newton, Massachusetts",
  "image": "assets/nate_headshot.jpeg",
  "bio": "Paragraph of bio text.",
  "contact": [
    { "type": "Email", "value": "nathan.shea@bc.edu", "icon": "assets/email_icon.jpg", "link": "mailto:nathan.shea@bc.edu" },
    { "type": "LinkedIn", "value": "www.linkedin.com/in/...", "icon": "assets/linkedin_logo.jpg", "link": "https://linkedin.com/in/..." }
  ]
}
```

---

## Conventions

- **Dates**: ISO `YYYY-MM-DD` for news items and phase boundaries. `"Month YYYY"` for book `finished` field.
- **Asset paths**: always relative, no leading slash — `assets/filename.ext`.
- **Image naming**: snake_case with underscores — `liars_poker.jpg`, `nate_headshot.jpeg`. Exception: some older files use mixed case (e.g., `Case-Comp.jpg`, `natixis_headshot.JPG`) — match the actual filename exactly.
- **Book slugs**: lowercase, hyphenated, match the title — `"the-echo-of-greece"`. Must match the key in `BOOK_TAGS`.
- **Project `link`**: acts as the URL param value — use kebab-case with `.html` suffix (e.g., `clearfeed.html`, `future-of-housing-case-comp.html`). Must be unique.
- **Themes**: three options — `bc` (maroon, default), `hawaii`, `dark`. Stored in `localStorage`. Defined via CSS `data-theme` attribute on `<html>`.
- **Loading messages** (shown on startup): defined in `LOADING_MESSAGES` constant in `main.js`.
- **Section ordering on home page**: About → Now (countdown) → News → Projects → Stoic Corner → Inspiration Wall.
- **Projects on home page**: first 4 from the merged array (Supabase first, then `data.json`).
- **News on home page**: first 5 from the merged, date-sorted array.

---

## Gotchas

**Two content sources, one admin panel.** `data.json` is edited manually in code. Supabase is managed via `?page=admin`. The admin panel can only view/edit/delete Supabase rows — it does NOT touch `data.json`. When you add a project or news item via `data.json`, it will never appear in the admin panel's list. Supabase rows always appear before `data.json` rows in merged arrays.

**GitHub Actions workflow path is wrong.** The workflow is at `github/workflows/update-spotify.yml` but GitHub Actions requires `.github/workflows/`. The Spotify cron likely does not run automatically. If Spotify data stops updating, this is why.

**`BOOK_TAGS` must be updated manually.** When adding a book to `data.json`, also add its slug to the `BOOK_TAGS` object in `main.js` — otherwise the book has no category tags and won't appear in filtered library views. Supabase books pass tags as a `tags` field directly.

**Reading goal counts current calendar year only.** The widget calls `getBooksByYear(books, currentYear)` which filters on the `finished` field's year. A book marked `"December 2025"` will not count in 2026. Add books via admin with a 2026 finished date to appear in the current year's count. The goal count itself comes from the Supabase `reading_goals` table (default: 25 if no entry).

**Project detail pages are not real HTML files.** Despite having `.html`-looking `link` values (e.g., `clearfeed.html`), there are no actual HTML files for projects. The `link` field is just a URL param value used in `?project=clearfeed.html`. The detail page is rendered by `renderProjectPage()` in `main.js`.

**`?page=now` is dead.** That route redirects to home. Don't add it back.

**No build step.** Changes to `main.js`, `as7.css`, or `data.json` go live as soon as they're pushed to the main branch. There's no npm, no bundler, no transpilation.

**Admin auth requires Supabase session.** Visiting `?page=admin` without a valid Supabase session redirects to home. Login is at `/admin/login.html`. Admin status is checked against a Supabase `admins` table (not just any authenticated user).

**Phase boundary overlaps are fine.** When two phases share a date (e.g., Japan ends July 6 and Back Home starts July 6), the one with the later `start` date is treated as current. This is intentional.

**`data.json.rej`, `main.js.bak`, `patches/`** — these are leftovers from patch operations. Don't edit them; they're not loaded by anything.

---

## Common Tasks

### Add a life phase to the timeline
1. Open `main.js`, find `const PHASES = [` at the very top of the file.
2. Append a new entry: `{ name: "Phase Name 🌺", start: "YYYY-MM-DD", end: "YYYY-MM-DD" }`.
3. Keep phases in chronological order. Use ISO dates.
4. If extending an open-ended phase (like "Boston Post Grad"), just push out the `end` date.

### Add a news item
1. Open `data.json`, find `"news": [`.
2. Prepend a new object at the top of the array:
   ```json
   { "title": "...", "date": "2026-06-01", "content": "Full text here." }
   ```
3. Date format: `YYYY-MM-DD`. The array is re-sorted by date at runtime, but keep it chronological anyway.

### Add a project
1. Drop any images/logos into `assets/`.
2. Open `data.json`, find `"projects": [`.
3. Insert a new project object. Pick a unique `link` value (kebab-case + `.html`).
4. Home page shows the first 4 projects in the array — order matters.
5. Asset paths: `"src": "assets/your_image.jpg"` (no leading slash).

### Add a book
1. Drop the cover image into `assets/` — name it `book_title_words.jpg`.
2. Add the entry to `data.json → readingList[]`. Use `"Month YYYY"` for `finished`.
3. Add the book's slug to `BOOK_TAGS` in `main.js`:
   ```js
   "your-book-slug": ["📈 Business", "🌍 History"],
   ```
   Available tag categories: `📈 Business`, `🧠 Philosophy`, `🌍 History`, `🌍 Society`, `💭 Life`, `🎭 Identity`, `🏀 Sports`.
4. If the book has a pinned passage PDF, add `"pinned": true` and `"pdf": "assets/file.pdf"`.

### Update the "Now" section text (learning/reading/wrestling)
1. Open `main.js`, find `function renderNowPage()` (~line 1518).
2. Edit the three `<p>` tags inside the `now-content` div. The "wrestling with" item also has the collapsible senioritis explanation below it — update or remove that too if needed.
3. Update the `Last updated:` timestamp in the same function.
