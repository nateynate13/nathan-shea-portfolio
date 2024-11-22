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
}

function renderAbout(about) {
  return `
    <section id="about">
      <h2 class="section-title">About</h2>
      <div class="about-container">
        <div class="about-left">
          <img src="${about.image}" alt="Profile image of ${
    about.name
  }" class="about-image" />
          <p><strong>${about.name}</strong>, ${about.position}</p>
        </div>
        <div class="about-right">
          <p>${about.bio}</p>
          <p>Address: ${about.address}</p>
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
            <img src="${logo.src}" alt="${logo.alt}" class="${logo.alt
              .toLowerCase()
              .replace(/\s+/g, "-")}" />
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
  return `
    <section id="news">
      <h2 class="section-title">News</h2>
      <div class="search">
        <input type="search" name="news" id="news-search" placeholder="Search News..." />
      </div>
      <ul class="newslist">
        ${news
          .slice(0, 5) // Limit the initially visible news to 5
          .map((item) => renderNewsItems(item))
          .join("")}
      </ul>
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
