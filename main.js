const PHASES = [
  { name: "Studying Abroad in Athens 🇬🇷", start: "2025-01-07", end: "2025-05-06" },
  { name: "Summer Vacation 🏖️", start: "2025-05-07", end: "2025-06-01" },
  { name: "Natixis Internship in Boston 💼", start: "2025-06-02", end: "2025-08-15" },
  { name: "Summer Break 🌅", start: "2025-08-16", end: "2025-08-24" },
  { name: "BC Senior Fall Semester 🍁", start: "2025-08-25", end: "2025-12-18" },
  { name: "BC Senior Spring Semester 🌸", start: "2026-01-12", end: "2026-05-18" },
];

// Typewriter headlines
const TYPEWRITER_ROLES = [
  "Student",
  "Researcher",
  "Stoic",
  "Builder",
  "Hawaiʻi Native",
  "Learner",
  "Analyst",
  "Reader",
  "Problem Solver"
];

// Loading messages
const LOADING_MESSAGES = [
  "Generating clarity...",
  "Fetching the next chapter...",
  "Grabbing the right tools...",
  "E mālama pono...",
  "Building connections...",
  "Curating thoughts..."
];

// Stoic quotes
const STOIC_QUOTES = [
  "The impediment to action advances action. What stands in the way becomes the way. — Marcus Aurelius",
  "We suffer more often in imagination than in reality. — Seneca",
  "You have power over your mind—not outside events. Realize this, and you will find strength. — Marcus Aurelius",
  "It is not that we have a short time to live, but that we waste a lot of it. — Seneca",
  "The best revenge is not being like your enemy. — Marcus Aurelius",
  "He who fears death will never do anything worth of a man who is alive. — Seneca",
  "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it. — Marcus Aurelius",
  "Wealth consists not in having great possessions, but in having few wants. — Epictetus"
];

// Book tags mapping (inferred from content)
const BOOK_TAGS = {
  "the-echo-of-greece": ["🧠 Philosophy", "🌍 History"],
  "tuesdays-with-morrie": ["🧠 Philosophy", "💭 Life"],
  "a-safe-place": ["🎭 Identity", "🌍 Society"],
  "the-alchemist": ["🧠 Philosophy", "💭 Life"],
  "the-best-minds-jonathan-rosen": ["🧠 Philosophy", "🌍 Society", "🎭 Identity"],
  "the-return-hisham-matar": ["🌍 History", "🌍 Society"],
  "the-startup-of-you": ["📈 Business"],
  "why-so-serious-nikola-jokic": ["🏀 Sports", "💭 Life"],
  "the-charisma-myth": ["💭 Life", "📈 Business"],
  "goodbye-to-berlin": ["🌍 History", "🎭 Identity"],
  "the-greeks-a-global-history": ["🌍 History"],
  "talking-to-strangers": ["🧠 Philosophy", "🌍 Society"],
  "making-motherhood-work": ["🌍 Society"],
  "the-defining-decade": ["💭 Life", "📈 Business"]
};

// Loading Screen Functions
function showLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingText = document.getElementById("loading-text");
  if (loadingScreen && loadingText) {
    loadingScreen.style.display = "flex";
    let messageIndex = 0;
    loadingText.textContent = LOADING_MESSAGES[messageIndex];
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      loadingText.textContent = LOADING_MESSAGES[messageIndex];
    }, 1500);
    return interval;
  }
  return null;
}

function hideLoadingScreen(interval) {
  if (interval) clearInterval(interval);
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 300);
    }, 500);
  }
}

// Typewriter Effect
function initTypewriter(element, roles) {
  if (!element) return;
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = "";

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      currentText = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    element.textContent = currentText + (isDeleting ? "" : "|");

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
  }

  type();
}

// Theme Transition
function animateThemeTransition() {
  const overlay = document.getElementById("theme-transition-overlay");
  if (overlay) {
    overlay.style.opacity = "1";
    setTimeout(() => {
      overlay.style.opacity = "0";
    }, 300);
  }
}

// Copy Email Function (global)
window.copyEmail = function(email, event) {
  const button = event ? event.target : null;
  navigator.clipboard.writeText(email).then(() => {
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Copied!";
      button.style.backgroundColor = "var(--accent)";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "";
      }, 2000);
    }
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = email;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  });
};

// Get Random Stoic Quote
function getRandomStoicQuote() {
  return STOIC_QUOTES[Math.floor(Math.random() * STOIC_QUOTES.length)];
}

// Keyboard Navigation
function setupKeyboardNavigation() {
  document.addEventListener("keydown", (e) => {
    // Arrow key navigation for phase cards
    if (e.key === "ArrowLeft") {
      const prevBtn = document.getElementById("prev-phase");
      if (prevBtn) prevBtn.click();
    } else if (e.key === "ArrowRight") {
      const nextBtn = document.getElementById("next-phase");
      if (nextBtn) nextBtn.click();
    }
  });
}

// Mobile Swipe Detection
function setupSwipeDetection() {
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next
        const nextBtn = document.getElementById("next-phase");
        if (nextBtn) nextBtn.click();
      } else {
        // Swipe right - previous
        const prevBtn = document.getElementById("prev-phase");
        if (prevBtn) prevBtn.click();
      }
    }
  }
}

function renderNavbar(navigation, activeKey = null) {
  const currentTheme = getCurrentTheme();
  return `
    <nav>
      <ul>
        ${navigation
          .map(
            (item) => {
              const classes = [item.class, item.key && item.key === activeKey ? "active" : ""]
                .filter(Boolean)
                .join(" ");
              const ariaCurrent = item.key && item.key === activeKey ? ' aria-current="page"' : "";
              const targetAttr = item.target ? ` target="${item.target}"` : "";
              const relAttr = item.rel
                ? ` rel="${item.rel}"`
                : item.target === "_blank"
                ? ' rel="noopener noreferrer"'
                : "";
              return `
          <li${classes ? ` class="${classes}"` : ""}><a href="${item.href}"${ariaCurrent}${targetAttr}${relAttr}>${item.text}</a></li>
        `;
            }
          )
          .join("")}
      </ul>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <span id="theme-label">${currentTheme === "bc" ? "BC" : currentTheme === "hawaii" ? "Hawaiʻi" : "Dark"}</span>
      </button>
    </nav>
  `;
}

function setNavbar(navigation, activeKey = null) {
  const header = document.getElementById("navbar");
  if (header) {
    header.innerHTML = renderNavbar(navigation, activeKey);
    attachThemeToggle();
  }
}

function computePhases(today = new Date()) {
  const currentDate = new Date(today);

  const enriched = PHASES.map((phase) => {
    const start = new Date(phase.start);
    const end = new Date(phase.end);
    const isCurrent = currentDate >= start && currentDate <= end;
    const daysRemaining = Math.ceil((end - currentDate) / (1000 * 60 * 60 * 24));
    const startsIn = Math.ceil((start - currentDate) / (1000 * 60 * 60 * 24));
    const percentComplete = isCurrent
      ? (((currentDate - start) / (end - start)) * 100).toFixed(2)
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

  const currentPhases = enriched.filter((phase) => phase.isCurrent);
  const futurePhases = enriched
    .filter((phase) => phase.start > currentDate)
    .sort((a, b) => a.start - b.start);
  const pastPhases = enriched
    .filter((phase) => phase.end < currentDate)
    .sort((a, b) => b.start - a.start);

  return [...currentPhases, ...futurePhases, ...pastPhases];
}

function renderMain(data) {
  setNavbar(data.navigation, "home");
  const main = document.querySelector("main");
  const today = new Date();
  const phases = computePhases(today);
  main.innerHTML = `
    ${renderAbout(data.about)}
    ${renderStoicCorner()}
    ${renderNews(data.news, today, phases)}
    ${renderProjects(data.projects)}
    ${renderInspirationWall(data.inspiration || [])}
  `;

  // Initialize typewriter after DOM is ready
  setTimeout(() => {
    const typewriterEl = document.getElementById("typewriter-text");
    if (typewriterEl) initTypewriter(typewriterEl, TYPEWRITER_ROLES);
  }, 100);

  addNewsSearchEventListener(data.news);
  attachPhaseNavigation(phases);
}

function renderStoicCorner() {
  const quote = getRandomStoicQuote();
  return `
    <section id="stoic-corner">
      <h2 class="section-title">💭 Stoic Corner</h2>
      <blockquote class="stoic-quote">
        "${quote}"
      </blockquote>
      <p class="stoic-refresh">Refresh page for a new quote</p>
    </section>
  `;
}

function renderAbout(about) {
  const emailContact = about.contact.find(c => c.type === "Email");
  const emailValue = emailContact ? emailContact.value : "";
  
  return `
    <section id="about">
      <h2 class="section-title">About</h2>
      <div class="about-container">
        <div class="about-left">
          <img src="${about.image}" alt="Profile image of ${about.name}" class="about-image" />
          <p><strong>${about.name}</strong>, ${about.position}</p>
          <div class="typewriter-container">
            <span class="typewriter-prefix">I am a </span>
            <span id="typewriter-text" class="typewriter-text"></span>
          </div>
        </div>
        <div class="about-right">
          <p>${about.bio}</p>
          <p class="location">Location: ${about.location}</p>
          <div class="contact-details">
            ${about.contact
              .map(
                (contact) => `
              <p>
                <img src="${contact.icon}" alt="${contact.type} icon" class="icon" />
                <a href="${contact.link}">${contact.value}</a>
                ${contact.type === "Email" ? `<button class="copy-email-btn" onclick="copyEmail('${contact.value}', event)" aria-label="Copy email">📋</button>` : ""}
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
  const displayedProjects = projects.slice(0, 4);
  const hasMore = projects.length > 4;
  
  return `
    <section id="projects">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        ${displayedProjects
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
      ${hasMore ? `
        <div class="projects-see-more">
          <a href="?page=projects" class="see-more-link">
            See More Projects →
          </a>
        </div>
      ` : ""}
    </section>
  `;
}

function renderProjectsPage(projects) {
  return `
    <section id="projects-page">
      <h2 class="section-title">All Projects</h2>
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

function renderReadingListPage(books) {
  const bookEntries = Array.isArray(books) ? books : [];
  
  // Get all unique tags
  const allTags = new Set();
  bookEntries.forEach(book => {
    const tags = BOOK_TAGS[book.slug] || [];
    tags.forEach(tag => allTags.add(tag));
  });
  const uniqueTags = Array.from(allTags).sort();
  
  // Separate pinned and unpinned books
  const pinnedBooks = bookEntries.filter(book => book.pinned === true);
  const unpinnedBooks = bookEntries.filter(book => !book.pinned);
  
  // Combine: pinned first, then unpinned
  const sortedBooks = [...pinnedBooks, ...unpinnedBooks];
  
  const bookCards = sortedBooks
    .map(
      (book) => {
        const tags = BOOK_TAGS[book.slug] || [];
        const tagsHTML = tags.length > 0 
          ? `<div class="book-tags">${tags.map(tag => `<span class="book-tag" data-tag="${tag}">${tag}</span>`).join("")}</div>`
          : "";
        return `
          <a class="book-card${book.pinned ? ' pinned' : ''}" href="?book=${book.slug}" aria-label="View details for ${book.title}" data-book-slug="${book.slug}">
            <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy" />
            <div class="book-overlay">
              <h3>${book.title}</h3>
              <p>${book.author}</p>
              <p>Published ${book.published}</p>
              <p>Read ${book.finished}</p>
              ${tagsHTML}
            </div>
          </a>
        `;
      }
    )
    .join("");

  const emptyState = bookEntries.length
    ? ""
    : '<p class="library-empty">My library is under construction — check back soon for more favorites!</p>';

  const filterHTML = uniqueTags.length > 0
    ? `<div class="library-filters">
        <button class="filter-btn active" data-tag="all">All</button>
        ${uniqueTags.map(tag => `<button class="filter-btn" data-tag="${tag}">${tag}</button>`).join("")}
      </div>`
    : "";

  return `
    <section id="library">
      <h2 class="section-title">Library</h2>
      <p class="library-intro">A growing collection of books that have shaped my curiosity lately.</p>
      ${filterHTML}
      <div class="book-grid" id="book-grid">${bookCards}</div>
      ${emptyState}
    </section>
  `;
}

function renderBookPage(book) {
  const summaryContent = book.summary && book.summary.trim()
    ? book.summary
    : "<em>Summary coming soon.</em>";
  const reviewContent = book.review && book.review.trim()
    ? book.review
    : "<em>Thoughts coming soon.</em>";
  const reflectionSection = book.reflection
    ? `<h2>Quick Reflection</h2><p>${book.reflection}</p>`
    : "";
  
  const pdfSection = book.pdf
    ? `<div class="book-pdf-section">
        <h2>Related Reading</h2>
        <p><a href="${book.pdf}" target="_blank" class="pdf-link">Read the ending passage (PDF) →</a></p>
      </div>`
    : "";

  return `
    <section id="book-detail" class="book-detail">
      <a href="?page=library" class="library-back" aria-label="Back to Library">
        ← Back to Library
      </a>
      <div class="book-detail-content">
        <div class="book-detail-cover">
          <img src="${book.cover}" alt="Cover of ${book.title}" />
        </div>
        <div class="book-detail-info">
          <h1>${book.title}</h1>
          <p class="book-author">by ${book.author}</p>
          <p class="book-meta">Published ${book.published}</p>
          <p class="book-meta">Read ${book.finished}</p>
          <div class="book-rating" aria-label="Rated ${book.rating} out of 5 stars">
            ${renderRatingStars(book.rating)}
          </div>
          <h2>Summary</h2>
          <p>${summaryContent}</p>
          <h2>My Thoughts</h2>
          <p>${reviewContent}</p>
          ${reflectionSection}
          ${pdfSection}
        </div>
      </div>
    </section>
  `;
}

// Library Filter Functionality
function setupLibraryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const bookCards = document.querySelectorAll(".book-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedTag = btn.getAttribute("data-tag");

      bookCards.forEach(card => {
        if (selectedTag === "all") {
          card.style.display = "";
        } else {
          const cardTags = card.querySelectorAll(".book-tag");
          const hasTag = Array.from(cardTags).some(tagEl => tagEl.getAttribute("data-tag") === selectedTag);
          card.style.display = hasTag ? "" : "none";
        }
      });
    });
  });
}

// Render Now Page
function renderNowPage() {
  return `
    <section id="now-page">
      <h2 class="section-title">Now</h2>
      <p class="now-intro">What I'm focused on right now:</p>
      <div class="now-content">
        <div class="now-item">
          <h3>Right now, I'm learning:</h3>
          <p>REITs</p>
        </div>
        <div class="now-item">
          <h3>Right now, I'm reading:</h3>
          <p>Liar's Poker by Michael Lewis</p>
        </div>
        <div class="now-item">
          <h3>Right now, I'm wrestling with:</h3>
          <p>"Senioritus" <button class="senioritis-toggle" onclick="toggleSenioritis()">(click to read more)</button></p>
          <div id="senioritis-explanation" class="senioritis-explanation" style="display: none;">
            <p>Senioritis is the late-college mindset where motivation for classes fades, not because of laziness but because your energy shifts away from grades and toward preparing for real life. It is a restless mix of feeling mentally ready for a slower, more intentional pace while also sensing quiet anxiety about leaving the college bubble with its routines, friendships, and identity-defining experiences. It is not just burnout, but the emotional transition from student life to adulthood, felt one creeping day at a time.</p>
          </div>
        </div>
      </div>
      <p class="now-updated">Last updated: November 18, 2025</p>
    </section>
  `;
}

window.toggleSenioritis = function() {
  const explanation = document.getElementById("senioritis-explanation");
  const button = document.querySelector(".senioritis-toggle");
  if (explanation) {
    if (explanation.style.display === "none") {
      explanation.style.display = "block";
      if (button) button.textContent = "(click to hide)";
    } else {
      explanation.style.display = "none";
      if (button) button.textContent = "(click to read more)";
    }
  }
};

// Render Inspiration Wall
function renderInspirationWall(inspirationItems) {
  if (!inspirationItems || inspirationItems.length === 0) {
    return "";
  }

  return `
    <section id="inspiration-wall">
      <h2 class="section-title">Inspiration Wall</h2>
      <p class="inspiration-intro">Moments, ideas, and experiences that have altered my worldview.</p>
      <div class="inspiration-grid">
        ${inspirationItems
          .map(
            (item) => `
          <div class="inspiration-item">
            ${item.image ? `<img src="${item.image}" alt="${item.title || 'Inspiration'}" loading="lazy" />` : ""}
            ${item.audio ? `<audio controls><source src="${item.audio}" type="audio/mpeg"></audio>` : ""}
            <div class="inspiration-overlay">
              <h3>${item.title || ""}</h3>
              <p>${item.description || ""}</p>
              ${item.date ? `<small>${item.date}</small>` : ""}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}


function renderRatingStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push('<span class="star full">★</span>');
    } else if (rating >= i - 0.5) {
      stars.push('<span class="star half">★</span>');
    } else {
      stars.push('<span class="star empty">★</span>');
    }
  }

  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(0) : rating.toFixed(1);
  return `<div class="rating-stars" aria-hidden="true">${stars.join("")}</div><span class="rating-value">${ratingLabel} / 5</span>`;
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
    .map((logo) => {
      const imgTag = `<img src="${logo.src}" alt="${logo.alt}" style="${logo.style || ""}" class="${logo.alt.toLowerCase().replace(/\s+/g, "-")}" />`;
      return logo.link
        ? `<a href="${logo.link}" target="_blank">${imgTag}</a>`
        : imgTag;
    })
    .join("")}
</div>

      <a href="?page=projects">Back to Projects</a>
    </section>
  `;
}

// Initialize theme on page load
initializeTheme();

// Initialize global features
setupKeyboardNavigation();
setupSwipeDetection();

// Show loading screen
const loadingInterval = showLoadingScreen();

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const params = new URLSearchParams(window.location.search);
    const projectLink = params.get("project");
    const page = params.get("page");
    const bookSlug = params.get("book");
    const main = document.querySelector("main");

    if (projectLink) {
      const project = data.projects.find((proj) => proj.link === projectLink);
      if (project) {
        setNavbar(data.navigation, "home");
        main.innerHTML = renderProjectPage(project);
      } else {
        renderMain(data);
      }
    } else if (bookSlug) {
      const book = (data.readingList || []).find((item) => item.slug === bookSlug);
      if (book) {
        setNavbar(data.navigation, "library");
        main.innerHTML = renderBookPage(book);
      } else {
        setNavbar(data.navigation, "library");
        main.innerHTML = renderReadingListPage(data.readingList || []);
        setTimeout(() => setupLibraryFilters(), 100);
      }
    } else if (page === "library") {
      setNavbar(data.navigation, "library");
      main.innerHTML = renderReadingListPage(data.readingList || []);
      setTimeout(() => setupLibraryFilters(), 100);
    } else if (page === "projects") {
      setNavbar(data.navigation, "projects");
      main.innerHTML = renderProjectsPage(data.projects || []);
    } else if (page === "now") {
      setNavbar(data.navigation, "home");
      main.innerHTML = renderNowPage();
    } else if (page === "home") {
      renderMain(data);
    } else {
      renderMain(data);
    }

    // Hide loading screen
    hideLoadingScreen(loadingInterval);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    hideLoadingScreen(loadingInterval);
  });

function renderNews(news, today = new Date(), phases = computePhases(today)) {
  const graduationDate = new Date("2026-05-18");
  const showGradCountdown = today < new Date("2026-01-12");

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

  const countdownHTML = renderCountdownWidget(phases, today, gradCountdown);

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
  const now = new Date(date);
  for (let phase of PHASES) {
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

/* Theme Management */
function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") || localStorage.getItem("theme") || "bc";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeToggleLabel(theme);
}

function cycleTheme() {
  const current = getCurrentTheme();
  const themes = ["bc", "hawaii", "dark"];
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  animateThemeTransition();
  setTimeout(() => {
    setTheme(themes[nextIndex]);
  }, 150);
}

function updateThemeToggleLabel(theme) {
  const label = document.getElementById("theme-label");
  if (label) {
    label.textContent = theme === "bc" ? "BC" : theme === "hawaii" ? "Hawaiʻi" : "Dark";
  }
}

function attachThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", cycleTheme);
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "bc";
  setTheme(savedTheme);
}
