/**
 * LAST-KNOWN LOCATION
 * -------------------
 * Edit THIS FILE when Dave gets an aid-station report or a text from Bryce.
 * Then commit and push to `main`. Cloudflare Pages will republish shortly.
 *
 * Fields
 *   aidStation  {string}   Place / aid station name shown on the page
 *   note        {string}   Short human note (what we heard)
 *   updatedAt   {string}   ISO 8601 preferred (e.g. 2026-09-18T14:22:00-06:00)
 *                          or a display string like "Fri 2:22 PM"
 *   lat         {number|null}  Optional. With lng, drops a gold pin on the map
 *   lng         {number|null}  Optional. Set both to null to hide the pin
 *   status      {string}   Optional. e.g. "at aid", "en route to Dry Lake", "finished"
 *
 * Approximate aid-station coordinates (for the map pin) live in map.js as
 * COURSE_AIDS[]. Copy lat/lng from there, or leave them null.
 */
window.RUN4ELLIS_LOCATION = {
  aidStation: "Mount Werner (Out)",
  note: "Checked out of Mt Werner at 9:38 AM MT — 4.6 mi, split 1:38:40. Next up: Fish Creek Falls (~16.8 mi).",
  updatedAt: "2026-09-18T09:38:40-06:00",
  lat: 40.4564,
  lng: -106.743,
  status: "Out — en route to Fish Creek Falls",
};
