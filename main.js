function renderNavbar(navigation) {
  return `
    <nav>
      <ul>
        ${navigation
          .map(
            (item) => `
          <li><a href="${item.href}">${item.text}</a></li>
        `
          )
          .join("")}
      </ul>
    </nav>
  `;
}

function renderMain(data) {
  const main = document.querySelector("main");
  main.innerHTML = `
    ${renderNavbar(data.navigation)}
    ${renderAbout(data.about)}
    ${renderNews(data.news)}
    ${renderProjects(data.projects)}
  `;

  addNewsSearchEventListener(data.news);
  
  attachPhaseNavigation([
  { name: "Studying Abroad in Athens 🇬🇷", start: "2025-01-07", end: "2025-05-06" },
  { name: "Summer Vacation 🏖️", start: "2025-05-07", end: "2025-06-01" },
  { name: "Natixis Internship in Boston 💼", start: "2025-06-02", end: "2025-08-15" },
  { name: "Summer Break 🌅", start: "2025-08-16", end: "2025-08-24" },
  { name: "BC Senior Fall Semester 🍁", start: "2025-08-25", end: "2025-12-18" },
  { name: "BC Senior Spring Semester 🌸", start: "2026-01-12", end: "2026-05-18" },
]);

}

function renderAbout(about) {
  return `
    <section id="about">
      <h2 class="section-title">About</h2>
      <div class="about-container">
        <div class="about-left">
          <img src="${about.image}" alt="Profile image of ${about.name}" class="about-image" />
          <p><strong>${about.name}</strong>, ${about.position}</p>
        </div>
        <div class="about-right">
          <p>${about.bio}</p>
          <p class="location">Location: ${about.location}</p> <!-- Added class here -->
          <div class="contact-details">
            ${about.contact
              .map(
                (contact) => `
              <p>
                <img src="${contact.icon}" alt="${contact.type} icon" class="icon" /> 
                <a href="${contact.link}">${contact.value}</a>
              </p>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}


function renderProjects(projects) {
  return `
    <section id="projects">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        ${projects
          .map(
            (project) => `
          <div class="project-card">
            <h2>${project.title}</h2>
            <p>${project.short_description}</p>
            <a href="?project=${project.link}">View Project</a>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderProjectPage(project) {
  return `
    <section id="project-details">
      <h2>${project.details.title}</h2>
      <p>${project.details.description}</p>
      <h3>Technologies Used:</h3>
      <ul>
        ${project.details.technologies
          .map((tech) => `<li>${tech}</li>`)
          .join("")}
      </ul>
      <div class="logo-grid">
  ${project.details.logos
    .map(
      (logo) => `
        <a href="${logo.link}">
          <img src="${logo.src}" alt="${logo.alt}" style="${
        logo.style || ""
      }" class="${logo.alt.toLowerCase().replace(/\s+/g, "-")}" />
        </a>
      `
    )
    .join("")}
</div>

      <a href="index.html">Back to Projects</a>
    </section>
  `;
}

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const projectLink = params.get("project");

    if (projectLink) {
      const project = data.projects.find((proj) => proj.link === projectLink);
      if (project) {
        document.querySelector("main").innerHTML = renderProjectPage(project);
      } else {
        renderMain(data);
      }
    } else {
      renderMain(data);
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

function renderNews(news) {
  const today = new Date();
  const graduationDate = new Date("2026-05-18");
  const showGradCountdown = today < new Date("2026-01-12");

  const rawPhases = [
    { name: "Studying Abroad in Athens 🇬🇷", start: "2025-01-07", end: "2025-05-06" },
    { name: "Summer Vacation 🏖️", start: "2025-05-07", end: "2025-06-01" },
    { name: "Natixis Internship in Boston 💼", start: "2025-06-02", end: "2025-08-15" },
    { name: "Summer Break 🌅", start: "2025-08-16", end: "2025-08-24" },
    { name: "BC Senior Fall Semester 🍁", start: "2025-08-25", end: "2025-12-18" },
    { name: "BC Senior Spring Semester 🌸", start: "2026-01-12", end: "2026-05-18" },
  ];

  const enrichedPhases = rawPhases.map((phase) => {
    const start = new Date(phase.start);
    const end = new Date(phase.end);
    const isCurrent = today >= start && today <= end;
    const isFuture = today < start;
    const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    const startsIn = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
    const percentComplete = isCurrent
      ? (((today - start) / (end - start)) * 100).toFixed(2)
      : null;

    return {
      ...phase,
      start,
      end,
      isCurrent,
      daysRemaining,
      percentComplete,
      startsIn,
    };
  });

  const totalGradDays = (graduationDate - new Date("2025-01-07")) / (1000 * 60 * 60 * 24); // from study abroad start



const collegeStartDate = new Date("2022-08-22");
const totalCollegeDays = (graduationDate - collegeStartDate) / (1000 * 60 * 60 * 24);
const gradDaysLeft = (graduationDate - today) / (1000 * 60 * 60 * 24);
const gradProgress = (100 - (gradDaysLeft / totalCollegeDays) * 100).toFixed(2);

const gradCountdown = showGradCountdown
  ? `<div class="countdown-card graduation-countdown">
      <h3>Graduation 🎓</h3>
      <p>${Math.ceil(gradDaysLeft)} days left</p>
      <p>${(gradDaysLeft / 7).toFixed(1)} weeks left</p>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${gradProgress}%"></div>
      </div>
      <small>${gradProgress}% of college completed (since Aug 21, 2023)</small>
    </div>`
  : "";


  const countdownHTML = renderCountdownWidget(enrichedPhases, today, gradCountdown);

  return `
    <section id="news">
      <h2 class="section-title">News</h2>
      <div class="search">
        <input type="search" name="news" id="news-search" placeholder="Search News..." />
      </div>
      <ul class="newslist">
        ${news.slice(0, 5).map((item) => renderNewsItems(item)).join("")}
      </ul>
      ${countdownHTML}
    </section>
  `;
}



function addNewsSearchEventListener(news) {
  const search = document.querySelector(".search input");
  const newsList = document.querySelector(".newslist");

  console.log(search);
  console.log(newsList);

  search.addEventListener("input", (e) => {
    console.log(e.currentTarget);
    console.log(e.target);
    console.log(e.target.value);

    const query = e.target.value.toLowerCase();

    const filteredNews = news.filter(
      (newsItem) =>
        newsItem.title.toLowerCase().includes(query) ||
        (newsItem.date && newsItem.date.toLowerCase().includes(query))
    );

    console.log(filteredNews);

    newsList.innerHTML = filteredNews
      .map((item) => renderNewsItems(item))
      .join("");
  });
}

function renderNewsItems(newsItem) {
  return `
    <li>
      <strong>${newsItem.title}</strong>
      <em>${newsItem.date || "Unknown Date"}</em>
      <a href="#" class="show-more" onclick="toggleContent(event, this)">Show More</a>
      <p class="news-content" style="display: none;">${newsItem.content}</p>
    </li>
  `;
}

function toggleContent(event, link) {
  event.preventDefault();
  const content = link.nextElementSibling;
  if (content.style.display === "none") {
    content.style.display = "block";
    link.textContent = "Show Less";
  } else {
    content.style.display = "none";
    link.textContent = "Show More";
  }
}

function getCurrentPhase(date = new Date()) {
  const phases = [
    { name: "Studying Abroad in Athens 🇬🇷", start: "2025-01-07", end: "2025-05-06" },
    { name: "Summer Vacation 🏖️", start: "2025-05-07", end: "2025-06-01" },
    { name: "Natixis Internship in Boston 💼", start: "2025-06-02", end: "2025-08-15" },
    { name: "Summer Break 🌅", start: "2025-08-16", end: "2025-08-24" },
    { name: "BC Senior Fall Semester 🍁", start: "2025-08-25", end: "2025-12-18" },
    { name: "BC Senior Spring Semester 🌸", start: "2026-01-12", end: "2026-05-18" },
  ];

  const now = new Date(date);
  for (let phase of phases) {
    const start = new Date(phase.start);
    const end = new Date(phase.end);
    if (now >= start && now <= end) {
      return { ...phase, start, end };
    }
  }

  return null;
}

function renderCountdownWidget(phases, today, gradCountdown) {
  const phaseCards = phases
    .map((phase, i) => {
      const start = new Date(phase.start);
      const end = new Date(phase.end);
      const isCurrent = phase.isCurrent;
      const isFuture = today < start;
      const isPast = today > end;

      let content = `<strong>${phase.name}</strong><br/>
        <small>${start.toDateString()} – ${end.toDateString()}</small><br/>`;

      if (isCurrent) {
        content += `<p>${phase.daysRemaining} days remaining</p>
                    <p>${phase.percentComplete}% complete</p>`;
      } else if (isFuture) {
        content += `<p>Starts in ${phase.startsIn} days</p>`;
      } else {
        content += `<p>Phase Complete ✅</p>`;
      }

      return `<div class="countdown-card phase-card" data-index="${i}" style="display: ${
        isCurrent ? "block" : "none"
      };">${content}</div>`;
    })
    .join("");

  return `
    <section id="life-countdown">
      <h2 class="section-title">⏳ Current/Future Happenings</h2>
      <div class="countdown-widget">
        <div class="countdown-phase-nav">
          <button id="prev-phase" aria-label="Previous Phase">←</button>
          <div id="phase-container">${phaseCards}</div>
          <button id="next-phase" aria-label="Next Phase">→</button>
        </div>
        ${gradCountdown}
      </div>
    </section>
  `;
}



function attachPhaseNavigation(phases) {
  const cards = document.querySelectorAll(".phase-card");
  let current = phases.findIndex((p) => p.isCurrent);
  if (current === -1) current = 0;

  function showCard(index) {
    cards.forEach((card, i) => {
      card.style.display = i === index ? "block" : "none";
    });
  }

  const prevBtn = document.getElementById("prev-phase");
  const nextBtn = document.getElementById("next-phase");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + cards.length) % cards.length;
      showCard(current);
    });

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % cards.length;
      showCard(current);
    });
  }

  showCard(current);
}
