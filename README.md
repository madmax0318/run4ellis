# Run for Ellis

Static hub for Bryce Montano’s Run Rabbit Run 100 in honor of Ellis McDaniel.

**Live:** https://run4ellis.mcdaniel.fyi

Open `index.html` in a browser. No install, no build.

## Links

- Donate: https://gofund.me/4b17893d2
- Shirt: https://allsaintssupply.com/products/running-for-ellis
- Track: https://runrabbitrunsteamboat.com/
- Official course: https://runrabbitrunsteamboat.com/the-course/
- CalTopo: https://caltopo.com/m/F810

## Race-day updates (edit this file)

When Dave gets an aid-station report or a text from Bryce, edit **`location.js`** at the repo root.

Fields inside `window.RUN4ELLIS_LOCATION`:

| Field | What to put |
| --- | --- |
| `aidStation` | Aid station or place name (`"Dry Lake"`, `"Olympian Hall"`) |
| `note` | Short note about what you heard |
| `updatedAt` | ISO time preferred: `2026-09-18T16:40:00-06:00` (Mountain), or a plain string |
| `lat` / `lng` | Optional. If both are set, a gold pin is drawn on the map. Use `null` to hide it. |
| `status` | Optional: `"at aid"`, `"en route to Summit Lake"`, `"finished"` |
| `mile` | Course mile for the elevation-profile marker (e.g. `4.6`). Chart scale is 0–100. |

Approximate aid-station coordinates are in `map.js` (`COURSE_AIDS`) if you want to copy `lat` / `lng`.

Then commit and push to `main`. Cloudflare Pages will republish; `location.js` is cached for about 60 seconds.

Example:

```js
window.RUN4ELLIS_LOCATION = {
  aidStation: "Dry Lake",
  note: "Checked in, heading toward Olympian Hall. Moving well.",
  updatedAt: "2026-09-18T22:15:00-06:00",
  lat: 40.5158,
  lng: -106.788,
  status: "en route to Olympian Hall",
  mile: 44.5,
};
```

Do not edit `index.html` for location updates.

## Cloudflare Pages

- Framework preset: None
- Build command: *(none)*
- Output directory: `/` (project root)
- Production branch: `main`
- Custom domain: `run4ellis.mcdaniel.fyi`

## Race-day note

Tracking is on the official site on Friday. Aid-station updates only (delayed). No Garmin inReach this year. Occasional texts when Bryce can send them.

## Local preview

```bash
python3 -m http.server 4173
```

Then open http://127.0.0.1:4173/
