/* Renders assets/data/events.json into Upcoming / Past tabs.
   To add/edit/remove events, only edit events.json. */
(function () {
  const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  function dateParts(dateStr) {
    const d = new Date(dateStr);
    if (isNaN(d)) return { day: "--", month: "" };
    return { day: d.getDate(), month: MONTHS[d.getMonth()] };
  }

  function card(ev, isPast) {
    const { day, month } = dateParts(ev.date);
    return `
      <article class="event-card ${isPast ? "past" : ""}">
        <div class="event-date">
          <span class="d">${day}</span>
          <span class="m">${month}</span>
        </div>
        <div class="event-body">
          <h3>${ev.title}</h3>
          <div class="event-meta">
            ${ev.time ? `<span>${ev.time}</span>` : ""}
            ${ev.venue ? `<span>${ev.venue}</span>` : ""}
          </div>
          <p>${ev.description || ""}</p>
        </div>
      </article>`;
  }

  function renderList(containerId, events, isPast) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!events || events.length === 0) {
      el.innerHTML = `<p class="empty-row">No events listed yet — add entries to events.json.</p>`;
      return;
    }
    el.innerHTML = events.map((e) => card(e, isPast)).join("");
  }

  fetch("assets/data/events.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load events.json");
      return res.json();
    })
    .then((data) => {
      renderList("upcomingEventsList", data.upcoming, false);
      renderList("pastEventsList", data.past, true);
    })
    .catch((err) => {
      console.error(err);
      document.querySelectorAll(".event-list").forEach((el) => {
        el.innerHTML = `<p class="empty-row">Could not load event data. If you're viewing this file directly (file://), run a local server — see README.md.</p>`;
      });
    });

  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).classList.add("active");
      });
    });
  });
})();
