/**
 * Course overview + last-known location.
 * Race-day updates: edit location.js only.
 */
(function () {
  const COURSE_AIDS = [
    { id: "start", name: "Start / Finish", short: "Start", mile: "0 / 101.5", lat: 40.4572, lng: -106.8053 },
    { id: "werner", name: "Mount Werner", short: "Werner", mile: "5.3 / 95.8", lat: 40.4564, lng: -106.743 },
    { id: "fish", name: "Fish Creek Falls", short: "Fish Creek", mile: "17.7", lat: 40.4819, lng: -106.7705 },
    { id: "long", name: "Long Lake", short: "Long Lake", mile: "24.3 / 89.0", lat: 40.5165, lng: -106.6678 },
    { id: "summit", name: "Summit Lake", short: "Summit", mile: "30.1 / 80.8", lat: 40.5448, lng: -106.6818 },
    { id: "billys", name: "Billy's Rabbit Hole", short: "Billy's", mile: "34.3 / 76.6", lat: 40.534, lng: -106.718 },
    { id: "dry", name: "Dry Lake", short: "Dry Lake", mile: "44.5 / 70.8", lat: 40.5158, lng: -106.788 },
    { id: "olympian", name: "Olympian Hall", short: "Olympian", mile: "51.2 / 63.9", lat: 40.4834, lng: -106.8378 },
  ];

  const OVERVIEW_LINE = COURSE_AIDS.map(function (a) {
    return [a.lat, a.lng];
  });

  function $(id) {
    return document.getElementById(id);
  }

  function formatUpdatedAt(value) {
    if (!value) return "Not yet updated";
    var parsed = new Date(value);
    var looksIso = /T|\d{4}-\d{2}-\d{2}/.test(String(value));
    if (looksIso && !Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleString("en-US", {
        timeZone: "America/Denver",
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      });
    }
    return String(value);
  }

  function readLocation() {
    var loc = window.RUN4ELLIS_LOCATION || window.RUN4ELLIS_LOCATION || null;
    if (!loc) return null;
    return {
      aidStation: loc.aidStation || loc.aid_station || "",
      note: loc.note || "",
      updatedAt: loc.updatedAt || loc.updated_at || loc.updated || "",
      lat: typeof loc.lat === "number" ? loc.lat : null,
      lng: typeof loc.lng === "number" ? loc.lng : null,
      status: loc.status || "",
    };
  }

  function hasCoords(loc) {
    return loc && typeof loc.lat === "number" && typeof loc.lng === "number";
  }

  function renderStatus(loc) {
    var updated = $("status-updated");
    var aid = $("status-aid");
    var status = $("status-state");
    var note = $("status-note");
    var stamp = $("status-stamp");

    if (!loc) {
      if (updated) updated.textContent = "No update loaded";
      if (note) note.textContent = "location.js did not load. Hard-refresh the page.";
      return;
    }

    if (updated) updated.textContent = formatUpdatedAt(loc.updatedAt);
    if (aid) aid.textContent = loc.aidStation || "—";
    if (status) {
      if (loc.status) {
        status.hidden = false;
        status.textContent = loc.status;
      } else {
        status.hidden = true;
      }
    }
    if (note) note.textContent = loc.note || "";
    if (stamp) {
      stamp.textContent = hasCoords(loc)
        ? "Gold pin on the map marks this update."
        : "No coordinates in this update — map pin hidden.";
    }
  }

  function aidIcon(label) {
    return window.L.divIcon({
      className: "aid-marker",
      html: '<span class="aid-marker__dot" title="' + label + '"></span>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  }

  function liveIcon() {
    return window.L.divIcon({
      className: "live-marker",
      html: '<span class="live-marker__pulse"></span><span class="live-marker__dot"></span>',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  }

  function initMap(loc) {
    var el = $("course-map");
    if (!el || !window.L) return;

    var map = window.L.map(el, {
      scrollWheelZoom: false,
      tapTolerance: 20,
      zoomControl: true,
      attributionControl: true,
    });

    window.L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 16,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)',
    }).addTo(map);

    window.L.polyline(OVERVIEW_LINE, {
      color: "#c9a24a",
      weight: 3,
      opacity: 0.7,
      dashArray: "7 8",
    }).addTo(map);

    COURSE_AIDS.forEach(function (aid) {
      window.L.marker([aid.lat, aid.lng], {
        icon: aidIcon(aid.short),
        keyboard: true,
        title: aid.name,
      })
        .addTo(map)
        .bindPopup(
          "<strong>" +
            aid.name +
            "</strong><br>Approx. mile " +
            aid.mile +
            "<br><span class='popup-note'>Overview pin — not official GPS</span>"
        );
    });

    var bounds = window.L.latLngBounds(
      COURSE_AIDS.map(function (a) {
        return [a.lat, a.lng];
      })
    );

    if (hasCoords(loc)) {
      window.L.marker([loc.lat, loc.lng], {
        icon: liveIcon(),
        zIndexOffset: 500,
        title: "Last known location",
      })
        .addTo(map)
        .bindPopup(
          "<strong>Last known</strong><br>" +
            (loc.aidStation || "") +
            (loc.status ? "<br>" + loc.status : "") +
            "<br>" +
            formatUpdatedAt(loc.updatedAt)
        );
      bounds.extend([loc.lat, loc.lng]);
    }

    map.fitBounds(bounds.pad(0.18));
    setTimeout(function () {
      map.invalidateSize();
      map.fitBounds(bounds.pad(0.18));
    }, 200);

    var legend = $("aid-legend");
    if (legend) {
      legend.innerHTML = COURSE_AIDS.map(function (aid) {
        return "<li><span>" + aid.name + "</span><span>mi " + aid.mile + "</span></li>";
      }).join("");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var loc = readLocation();
    renderStatus(loc);
    try {
      initMap(loc);
    } catch (err) {
      if (typeof console !== "undefined" && console.error) console.error("run4ellis map", err);
    }
  });
})();
