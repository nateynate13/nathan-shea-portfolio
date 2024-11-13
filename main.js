// Function to render the navigation bar
function renderNavbar(navigation) {
  return `
    <nav>
      <ul>
        ${navigation.map(item => `
          <li><a href="${item.href}">${item.text}</a></li>
        `).join('')}
      </ul>
    </nav>
  `;
}

// Function to render the main page, calling other render functions
function renderMainPage(data) {
  const main = document.querySelector("main");
  main.innerHTML = `
    ${renderNavbar(data.navigation)}
    ${renderAbout(data.about)}
    ${renderNews(data.news)}
    ${renderProjects(data.projects)}
  `;
}

// Function to render the "About" section
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
          <p>Address: ${about.address}</p>
          <div class="contact-details">
            ${about.contact.map(contact => `
              <p>
                <img src="${contact.icon}" alt="${contact.type} icon" class="icon" /> 
                <a href="${contact.link}">${contact.value}</a>
              </p>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderNews(news) {
  return `
    <section id="news">
      <h2 class="section-title">News</h2>
      <ul>
        ${news.map(item => `<li>${item.content}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderProjects(projects) {
  return `
    <section id="projects">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        ${projects.map(project => `
          <div class="project-card">
            <h2>${project.title}</h2>
            <p>${project.short_description}</p>
            <a href="?project=${project.link}">View Project</a>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// Function to render a detailed view for a single project
function renderProjectPage(project) {
  return `
    <section id="project-details">
      <h2>${project.details.title}</h2>
      <p>${project.details.description}</p>
      <h3>Technologies Used:</h3>
      <ul>
        ${project.details.technologies.map(tech => `<li>${tech}</li>`).join('')}
      </ul>
      <div class="logo-grid">
        ${project.details.logos.map(logo => `
          <a href="${logo.link}">
            <img src="${logo.src}" alt="${logo.alt}" class="${logo.alt.toLowerCase().replace(/\s+/g, '-')}" />
          </a>
        `).join('')}
      </div>
      <a href="index.html">Back to Projects</a>
    </section>
  `;
}

// Fetch data and render the main page or specific project page based on URL
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const params = new URLSearchParams(window.location.search);
    const projectLink = params.get('project');

    if (projectLink) {
      // Render project details if a project is specified
      const project = data.projects.find(proj => proj.link === projectLink);
      if (project) {
        document.querySelector("main").innerHTML = renderProjectPage(project);
      } else {
        renderMainPage(data); // fallback to main page if project not found
      }
    } else {
      // Render the main page
      renderMainPage(data);
    }
  })
  .catch(error => console.error('Error fetching data:', error));
