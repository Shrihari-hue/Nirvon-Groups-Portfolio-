# Nirvon Portfolio

## Run it
Double-click **Start Localhost.command**, or in Terminal:

    cd ~/"Nirvon Portfolio"
    python3 -m http.server 8000

Then open http://localhost:8000. After saving a change, refresh the browser (Cmd + Shift + R).

## Where things are

| File | What to edit there |
|---|---|
| `index.html` | Page shell: title, navigation links, the "Start a project" button, mobile menu. |
| `css/style.css` | All styling. Colours and fonts are at the very top in `:root` (e.g. `--accent` is the purple). |
| `js/projects.js` | **Your projects**: name, category, location, live URL, tagline, brief / approach / result text, page list, features, and which screenshots to use. |
| `js/main.js` | All page content and animation. Search (Cmd + F) for the text you want to change. |
| `assets/web/` | Project screenshots (`<project>-d0.jpg` = desktop, `-m0.jpg` = phone). |
| `assets/videos/` | Laptop and phone recordings: `<project>-d.mp4` (laptop), `<project>-m.mp4` (phone). |

## Common edits — in `js/main.js`
Search for these words to jump to each part:

- `function pageHome` — the home page: hero headline, services, pricing, process, FAQ.
- `Websites with` — hero headline.
- `₹25,000` — pricing plans.
- `data-count` — the stats (40+ projects, 92%, 6+ years).
- `const Q=` — testimonials (currently samples; replace with real client quotes).
- `How do we get started` — FAQ questions and answers.
- `function footer` — footer: email, phone, social links.
- `function pageAbout` / `function pageContact` — About and Contact pages.
- `function initGallery` — the 3D laptop + phone showcase.

## Add a new project
1. Put screenshots in `assets/web/` (e.g. `newsite-d0.jpg`, `newsite-m0.jpg`).
2. Put recordings in `assets/videos/` as `newsite-d.mp4` and `newsite-m.mp4`.
3. In `js/projects.js`, add the images to `IMG` and copy one project block in `P`, changing `id` to `newsite`.

Keep the folder structure as it is: `index.html` loads everything from `css/`, `js/` and `assets/`.
