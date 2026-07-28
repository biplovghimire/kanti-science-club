# Kanti Science Club — Website

A static, JSON-driven website for Kanti Science Club, Kanti Secondary School,
Butwal-04, Rupandehi, Nepal. No build tools, frameworks, or server required —
plain HTML, CSS and JavaScript.

## Pages

| Page            | File           | Content |
|-----------------|----------------|---------|
| Home            | `index.html`   | Hero, quick stats, why we exist, CTA |
| About           | `about.html`   | History, Vision & Mission, Core Values, Objectives, Activities |
| Members         | `members.html` | Executive Committee → Executive Members → Teacher Advisors → Alumni Hall of Fame |
| Events          | `events.html`  | Upcoming / Past events (tabbed) |
| Projects        | `projects.html`| Yearwise project exhibition |
| Contact         | `contact.html` | Contact info, map, social links, contact form |

## Viewing the site locally

Because the Members / Events / Projects pages load their content from JSON
files using `fetch()`, some browsers (notably Chrome) block this when you
open the HTML file directly from disk (`file://...`). To view it correctly,
run a tiny local server from the project folder:

**Python (usually pre-installed):**
```
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Node.js:**
```
npx serve .
```

**VS Code:** install the "Live Server" extension and click "Go Live".

This is only needed for local viewing — once you upload the site to any real
web host (GitHub Pages, Netlify, cPanel, your school's hosting, etc.), it will
work normally without any of this.

## Adding your own content — no code changes needed

### Members (`assets/data/members.json`)
Four arrays: `executive_committee`, `executive_members`, `teacher_advisors`,
`alumni_hall_of_fame`. Each member is an object like:
```json
{
  "id": "KSC-EC-01",
  "name": "Full Name",
  "position": "President",
  "image": "assets/images/members/president.jpg",
  "phone": "+977-98XXXXXXXX",
  "social": { "facebook": "", "instagram": "", "linkedin": "" }
}
```
- `id` is just a display label (shown as a small tag on the photo) — make it
  whatever scheme you like, or leave it out.
- Leave any `social` field as an empty string `""` to hide that icon.
- `alumni_hall_of_fame` entries support an extra `"contribution"` field
  (a short sentence describing what they contributed).
- To add a member, copy an existing object inside the right array and edit
  it. To remove one, delete its object. Order in the JSON = order on the page.

### Events (`assets/data/events.json`)
Two arrays: `upcoming` and `past`. Each event:
```json
{
  "title": "Event Name",
  "date": "2026-09-12",
  "time": "10:00 AM – 4:00 PM",
  "venue": "Location",
  "description": "Short description.",
  "image": "assets/images/events/photo.jpg"
}
```
`date` must be in `YYYY-MM-DD` format so it displays correctly.

### Projects (`assets/data/projects.json`)
A `years` array, each with a `year` and a `projects` array:
```json
{
  "id": "KSC-PRJ-2026-01",
  "title": "Project Name",
  "members": ["Name 1", "Name 2"],
  "description": "What it does.",
  "image": "assets/images/projects/photo.jpg",
  "demo_video": "https://youtube.com/... (or leave empty)"
}
```
To add a new year, copy a whole `{ "year": ..., "projects": [...] }` block.
`demo_video` can be a YouTube/Drive link or a path to an .mp4 file — leave it
as `""` if there's no video yet.

## Images
See `assets/images/README.md` for folder layout and filenames. Until you add
real photos, the site shows neutral placeholder tiles automatically — nothing
will look broken.

## Dark mode
A toggle in the navigation switches themes and remembers the visitor's choice
(and respects their system preference on first visit). No setup needed.

## Customizing colors / fonts
All design tokens (colors, fonts, spacing) are defined as CSS variables at the
top of `assets/css/style.css` under `:root` and `html[data-theme="dark"]` —
change them there to re-theme the whole site at once.

## Contact form
The form on `contact.html` currently opens the visitor's email app with the
message pre-filled (no backend needed). To collect submissions directly, wire
it up to a free form service like Formspree or Google Forms and update the
small script at the bottom of `contact.html`.
