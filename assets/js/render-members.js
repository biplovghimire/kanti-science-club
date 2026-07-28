/* Renders assets/data/members.json into the four member tiers.
   To add/edit/remove members, only edit members.json — this file
   does not need to change. */
(function () {
  const socialIcon = (key) => {
    const icons = {
      facebook: "f",
      instagram: "IG",
      linkedin: "in",
    };
    return icons[key] || "•";
  };

  function socialLinks(social) {
    if (!social) return "";
    return Object.entries(social)
      .filter(([, url]) => url)
      .map(
        ([key, url]) =>
          `<a href="${url}" target="_blank" rel="noopener" aria-label="${key}">${socialIcon(key)}</a>`
      )
      .join("");
  }

  function card(member, { alumni = false } = {}) {
    const phone = member.phone
      ? `<span class="specimen-phone">${member.phone}</span>`
      : "<span></span>";
    return `
      <article class="specimen-card ${alumni ? "alumni-card" : ""}">
        <div class="photo-wrap">
          <span class="specimen-id">${member.id || ""}</span>
          <img src="${member.image}" alt="${member.name}"
            onerror="kscImgFallback(this, '${member.name.replace(/'/g, "")}')">
        </div>
        <div class="specimen-body">
          <h3>${member.name}</h3>
          <div class="specimen-position">${member.position || ""}</div>
          <div class="specimen-contact">
            ${phone}
            <span class="specimen-socials">${socialLinks(member.social)}</span>
          </div>
          ${
            alumni && member.contribution
              ? `<p class="specimen-note">${member.contribution}</p>`
              : ""
          }
        </div>
      </article>`;
  }

  function renderGrid(containerId, members, opts) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!members || members.length === 0) {
      el.innerHTML = `<p class="empty-row">No members listed yet — add entries to members.json.</p>`;
      return;
    }
    el.innerHTML = members.map((m) => card(m, opts)).join("");
  }

  fetch("assets/data/members.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load members.json");
      return res.json();
    })
    .then((data) => {
      renderGrid("executiveCommitteeGrid", data.executive_committee);
      renderGrid("executiveMembersGrid", data.executive_members);
      renderGrid("teacherAdvisorsGrid", data.teacher_advisors);
      renderGrid("alumniGrid", data.alumni_hall_of_fame, { alumni: true });
    })
    .catch((err) => {
      console.error(err);
      document.querySelectorAll(".member-grid").forEach((el) => {
        el.innerHTML = `<p class="empty-row">Could not load member data. If you're viewing this file directly (file://), run a local server — see README.md.</p>`;
      });
    });
})();
