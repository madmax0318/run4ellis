# Run for Ellis

Static one-page hub for Bryce Montano’s Run Rabbit Run 100 — running for Ellis and St. Jude.

Open `index.html` in a browser. No install, no build.

## Race-day updates (edit this file)

When Dave gets an aid-station report or a text from Bryce, edit **`location.js`** at the repo root.

Update these fields inside `window.RUN4ELLIS_LOCATION`:

| Field | What to put |
| --- | --- |
| `aidStation` | Aid station or place name (`"Dry Lake"`, `"Olympian Hall"`) |
| `note` | Short note about what you heard |
| `updatedAt` | ISO time preferred: `2026-09-18T16:40:00-06:00` (Mountain), or a plain string |
| `lat` / `lng` | Optional numbers. If both are set, a gold pin is drawn on the map. Use `null` to hide it. |
| `status` | Optional: `"at aid"`, `"en route to Summit Lake"`, `"finished"` |

Approximate aid-station coordinates are listed in `map.js` (`COURSE_AIDS`) if you want to copy `lat` / `lng`.

Then commit and push to `main`. Cloudflare Pages will republish; `location.js` is cached for about 60 seconds so the new status shows quickly.

Example:

```js
window.RUN4ELLIS_LOCATION = {
  aidStation: "Dry Lake",
  note: "Checked in, heading toward Olympian Hall. Moving well.",
  updatedAt: "2026-09-18T22:15:00-06:00",
  lat: 40.5158,
  lng: -106.788,
  status: "en route to Olympian Hall",
};
```

Do not edit `index.html` for location updates.

## Links

- Donate (Bryce Montano / St. Jude, “Running for Ellis”): https://gofund.me/4b17893d2
- Shirt: https://allsaintssupply.com/products/running-for-ellis
- Track / official race: https://runrabbitrunsteamboat.com/
- Official course: https://runrabbitrunsteamboat.com/the-course/
- CalTopo course reference: https://caltopo.com/m/F810

## Cloudflare Pages

Connect this GitHub repo (`madmax0318/run4ellis`) to Cloudflare Pages.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | *(leave empty — no build)* |
| Build output directory | `/` |
| Root directory | `/` |
| Production branch | `main` |
| Custom domain | `run4ellis.mcdaniel.fyi` |

The site is plain HTML/CSS/JS at the repo root. Pages can serve it as-is.

`_headers` sets short cache times so `location.js` updates are not stuck behind a long CDN cache.

## Tracking note (on the page)

Race-day tracking is on the official site on Friday. Bryce does **not** have a Garmin inReach this year. Updates come from aid stations (delayed) and occasional texts.

## Local preview

```bash
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173/
