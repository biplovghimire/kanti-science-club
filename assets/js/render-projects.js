/* Renders assets/data/projects.json grouped by year.
   To add/edit/remove projects or years, only edit projects.json. */
(function () {
  function isVideoUrl(url) {
    return /\.(mp4|webm|ogg)$/i.test(url || "");
  }

  function mediaBlock(project) {
    const playBadge = project.demo_video
      ? `<a class="play-badge" href="${project.demo_video}" target="_blank" rel="noopener" aria-label="Watch demo video"><span>▶</span></a>`
      : "";
    return `
      <div class="project-media">
        <span class="project-id">${project.id || ""}</span>
        <img src="${project.image}" alt="${project.title}"
          onerror="kscImgFallback(this, '${project.title.replace(/'/g, "")}')">
        ${playBadge}
      </div>`;
  }

  function card(project) {
    return `
      <article class="project-card">
        ${mediaBlock(project)}
        <div class="project-info">
          <h3>${project.title}</h3>
          <div class="project-members">${(project.members || []).join(", ")}</div>
          <p>${project.description || ""}</p>
          ${
            project.demo_video
              ? `<div class="project-links"><a class="btn btn-outline btn-sm" href="${project.demo_video}" target="_blank" rel="noopener">Watch demo</a></div>`
              : ""
          }
        </div>
      </article>`;
  }

  function yearBlock(yearEntry) {
    return `
      <div class="year-block">
        <div class="year-heading">
          <h2>${yearEntry.year}</h2>
          <div class="rule"></div>
          <span class="tag">${(yearEntry.projects || []).length} project${(yearEntry.projects || []).length === 1 ? "" : "s"}</span>
        </div>
        <div class="project-grid">
          ${(yearEntry.projects || []).map(card).join("")}
        </div>
      </div>`;
  }

  const container = document.getElementById("projectsByYear");

  fetch("../assets/data/projects.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load projects.json");
      return res.json();
    })
    .then((data) => {
      if (!container) return;
      const years = (data.years || []).slice().sort((a, b) => b.year.localeCompare(a.year));
      if (years.length === 0) {
        container.innerHTML = `<p class="empty-row">No projects listed yet !</p>`;
        return;
      }
      container.innerHTML = years.map(yearBlock).join("");
    })
    .catch((err) => {
      console.error(err);
      if (container) {
        container.innerHTML = `<p class="empty-row">Could not load project data. Try again later!</p>`;
      }
    });
})();
