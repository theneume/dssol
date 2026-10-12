# Deepsyke Solutions — website

Static marketing site for Deepsyke Solutions (advertising + AI SMS campaigns).

## What's in here

- `index.html` — the single page
- `style.css` — all styling (dark theme, gold accent)
- `script.js` — nav, scroll reveal, chat animation, contact form
- `assets/` — photos used on the page
- `video/` — sample ad screenshots shown in the "Example ads" section
- `server.js` — tiny zero-dependency Node static server (used for Render Web Service)
- `render.yaml` — Render Blueprint config
- `404.html` — not-found page

## Run locally

```bash
npm start
# then open http://localhost:3000
```

Or, with no Node at all:

```bash
python3 -m http.server 8000
```

## Deploy on Render

### Option A — Web Service (uses server.js)

- **Build Command:** `npm install`
- **Start Command:** `node server.js`

The server reads `process.env.PORT`, which Render sets automatically.

### Option B — Static Site (no server needed)

- **Build Command:** leave blank (or `echo "no build"`)
- **Publish Directory:** `.`

Either option works; the site is fully static and self-contained.

## Notes

- The contact form opens the visitor's email client via a `mailto:` link.
  Set the real address in `script.js` (look for `CONTACT_EMAIL`).
- Photos and sample ad images are illustrative, not real client work.
