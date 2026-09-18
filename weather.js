/**
 * Steamboat / Mount Werner weather via Open-Meteo (no API key).
 */
(function () {
  const LAT = 40.457;
  const LON = -106.805;
  const URL =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    LAT +
    "&longitude=" +
    LON +
    "&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FDenver&forecast_days=2";

  const WMO = {
    0: "Clear",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Icy fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy showers",
    95: "Thunderstorm",
  };

  function $(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const el = $(id);
    if (el) el.textContent = value;
  }

  function fail(msg) {
    setText("wx-temp", "—");
    setText("wx-cond", msg || "Weather unavailable");
    setText("wx-meta", "Check again in a bit.");
  }

  function render(data) {
    const cur = data.current || {};
    const daily = data.daily || {};
    const code = cur.weather_code;
    const cond = WMO[code] || "Conditions updating";
    const temp = Math.round(cur.temperature_2m);
    const feels = Math.round(cur.apparent_temperature);
    const wind = Math.round(cur.wind_speed_10m);
    const gust = Math.round(cur.wind_gusts_10m);
    const high = Math.round(daily.temperature_2m_max?.[0]);
    const low = Math.round(daily.temperature_2m_min?.[0]);
    const pop = daily.precipitation_probability_max?.[0];

    setText("wx-temp", Number.isFinite(temp) ? temp + "°F" : "—");
    setText("wx-cond", cond);
    setText(
      "wx-meta",
      [
        Number.isFinite(feels) ? "Feels " + feels + "°F" : null,
        Number.isFinite(wind) ? "Wind " + wind + (Number.isFinite(gust) ? "–" + gust : "") + " mph" : null,
        Number.isFinite(high) && Number.isFinite(low) ? "Today " + high + "° / " + low + "°" : null,
        Number.isFinite(pop) ? "Precip " + pop + "%" : null,
      ]
        .filter(Boolean)
        .join(" · ")
    );
    const stamp = $("wx-stamp");
    if (stamp && cur.time) {
      const d = new Date(cur.time);
      stamp.textContent = Number.isNaN(d.getTime())
        ? ""
        : "Updated " +
          d.toLocaleString("en-US", {
            timeZone: "America/Denver",
            weekday: "short",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!$("wx-temp")) return;
    fetch(URL)
      .then(function (r) {
        if (!r.ok) throw new Error("bad status");
        return r.json();
      })
      .then(render)
      .catch(function () {
        fail("Couldn’t load weather");
      });
  });
})();
