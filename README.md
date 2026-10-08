# Procrastop website

The marketing and legal site for [Procrastop](https://apps.apple.com/app/id6818837590),
a free iPhone to-do list. Static HTML, CSS and one small script, served by
GitHub Pages. No build step and no dependencies.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | The marketing home page |
| `privacy.html` | Privacy Policy, required by the App Store |
| `terms.html` | Terms of Use |
| `support.html` | Support contact and troubleshooting |
| `faq.html` | Longer FAQ |
| `delete-account.html` | How to remove your data |
| `changelog.html` | What is in each release |

## Editing

Shared values live in one place, `assets/config.js`: the app name, developer
name, support email, App Store URL, the colour and the "last updated" date that
the legal pages print. Change them there and every page follows.

Everything else is plain HTML. `assets/styles.css` holds the whole design, and
`assets/site.js` fills in the config values and fades sections in as they
scroll into view.

## Screenshots

`assets/screenshots/` holds real captures of the app, not mockups. Replace them
with new ones when the UI changes, keeping roughly the same aspect ratio so the
layout holds.

## Before publishing

Two values depend on the final public URL and cannot be filled in from the
repository alone:

- **`og:image`** in `index.html` is a relative path. Some social platforms
  require an absolute URL to show a preview card. Change it to the full
  `https://` address of `assets/screenshots/app-list.png` once the site's URL
  is settled.
- **A canonical link** is not set, for the same reason. Add
  `<link rel="canonical" href="...">` to each page if you want one.

`.well-known/apple-app-site-association` points at `/Procrastop/`. Confirm that
matches the path this site is actually served from.

## Accuracy

Every feature claim on this site was written against the app's source. If a
feature is renamed, removed or disabled in the app, update the copy here too.
The FAQ and changelog are the two pages that drift first.

## Local preview

```bash
python3 -m http.server 8099
```

Then open <http://127.0.0.1:8099/>. Opening the files directly with `file://`
works too, but relative asset paths behave differently, so the server is more
faithful to GitHub Pages.

## Credits

- **Concept:** Samer Morkos
- **Development:** Ziad Ismail

The footer credit on every page is driven by `credits` in `assets/config.js`.
The copyright line beside it is separate and names the publisher.
