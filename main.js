const PHASES = [
  { name: "Studying Abroad in Athens 🇬🇷", start: "2025-01-07", end: "2025-05-06" },
  { name: "Summer Vacation 🏖️", start: "2025-05-07", end: "2025-06-01" },
  { name: "Natixis Internship in Boston 💼", start: "2025-06-02", end: "2025-08-15" },
  { name: "Summer Break 🌅", start: "2025-08-16", end: "2025-08-24" },
  { name: "BC Senior Fall Semester 🍁", start: "2025-08-25", end: "2025-12-18" },
  { name: "Winter Break ❄️", start: "2025-12-17", end: "2026-01-12" },
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

// Stoic quotes (verified and properly formatted)
const STOIC_QUOTES = [
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "You have power over your mind—not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
  { text: "The best revenge is to be unlike him who performed the injury.", author: "Marcus Aurelius" },
  { text: "Let us prepare our minds as if we'd come to the very end of life. Let us postpone nothing.", author: "Seneca" },
  { text: "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.", author: "Marcus Aurelius" },
  { text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus" },
  { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
  { text: "Never call yourself a philosopher, nor talk a great deal among the unlearned about theorems, but act conformably to them.", author: "Epictetus" },
  { text: "It is impossible for a man to learn what he thinks he already knows.", author: "Epictetus" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" }
];

// Book tags mapping (inferred from content)
const BOOK_TAGS = {
  "liars-poker": ["📈 Business", "🌍 History"],
  "king-of-ashes": ["🌍 Society"],
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
  "the-defining-decade": ["💭 Life", "📈 Business"],
  "abundance": ["📈 Business", "🌍 Society"]
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
  const quote = STOIC_QUOTES[Math.floor(Math.random() * STOIC_QUOTES.length)];
  return `"${quote.text}" — ${quote.author}`;
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
      <button class="hamburger-menu" id="hamburger-menu" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul id="nav-menu">
        ${navigation
          .map(
            (item) => {
              const classes = [item.key && item.key === activeKey ? "active" : ""]
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

// Check if user is admin (async)
async function checkIsAdmin() {
  try {
    const { supabase } = await import('./js/supabaseClient.js');
    
    if (!supabase) {
      console.log('Admin check: Supabase client not available');
      return false;
    }
    
    // Check for session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    // Explicitly check: if any of these are missing, not admin
    if (sessionError) {
      console.log('Admin check: Session error', sessionError);
      return false;
    }
    
    if (!session) {
      console.log('Admin check: No session');
      return false;
    }
    
    if (!session.user) {
      console.log('Admin check: No user in session');
      return false;
    }
    
    if (!session.user.id) {
      console.log('Admin check: No user ID');
      return false;
    }
    
    // Check admin table
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('id')
      .eq('id', session.user.id)
      .single();
    
    if (adminError) {
      console.log('Admin check: Admin query error', adminError);
      return false;
    }
    
    if (!adminData) {
      console.log('Admin check: No admin data found');
      return false;
    }
    
    console.log('Admin check: User is admin');
    return true;
  } catch (error) {
    console.error('Admin check: Exception caught', error);
    return false;
  }
}

function setNavbar(navigation, activeKey = null, isAdmin = false) {
  const header = document.getElementById("navbar");
  if (header) {
    // Add admin tab if user is admin
    const navItems = [...navigation];
    if (isAdmin) {
      navItems.push({
        text: "Admin",
        href: "?page=admin",
        key: "admin"
      });
    }
    header.innerHTML = renderNavbar(navItems, activeKey);
    attachThemeToggle();
    attachHamburgerMenu();
  }
}

function attachHamburgerMenu() {
  const hamburger = document.getElementById("hamburger-menu");
  const navMenu = document.getElementById("nav-menu");
  
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("active") && 
          !navMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    });
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

  // If multiple phases are current (e.g., transition day), prioritize later phases
  if (currentPhases.length > 1) {
    currentPhases.sort((a, b) => b.start - a.start); // Later start date takes precedence
  }

  // If no current phase, default to BC Spring Semester (last phase)
  if (currentPhases.length === 0) {
    const bcSpring = enriched.find(p => p.name.includes("BC Senior Spring Semester"));
    if (bcSpring) {
      bcSpring.isCurrent = true;
      return [bcSpring, ...futurePhases, ...pastPhases.filter(p => p.name !== bcSpring.name)];
    }
  }

  return [...currentPhases, ...futurePhases, ...pastPhases];
}

async function renderMain(data, isAdmin = false) {
  setNavbar(data.navigation, "home", isAdmin);
  const main = document.querySelector("main");
  const today = new Date();
  const phases = computePhases(today);
  
  // Load news and projects from Supabase and merge with static data
  const allNews = await loadAllNews(data.news || []);
  const allProjects = await loadAllProjects(data.projects || []);
  
  main.innerHTML = `
    ${renderAbout(data.about)}
    ${renderNowSection(today, phases)}
    ${renderNews(allNews)}
    ${renderProjects(allProjects)}
    ${renderStoicCorner()}
    ${renderInspirationWall(data.inspiration || [])}
  `;

  // Initialize typewriter after DOM is ready
  setTimeout(() => {
    const typewriterEl = document.getElementById("typewriter-text");
    if (typewriterEl) initTypewriter(typewriterEl, TYPEWRITER_ROLES);
  }, 100);

  addNewsSearchEventListener(allNews);
  attachPhaseNavigation(phases);
  setupStoicQuoteClick();
  loadSpotifyData();

  // Load books for reading goal widget on homepage
  loadLibraryBooks(data.readingList || []).then(allBooks => {
    populateReadingGoalWidget(allBooks);
  }).catch(err => console.error('Error loading reading goal widget:', err));
}

function renderStoicCorner() {
  const quote = getRandomStoicQuote();
  return `
    <section id="stoic-corner">
      <h2 class="section-title">💭 Stoic Corner</h2>
      <blockquote class="stoic-quote" id="stoic-quote" style="cursor: pointer;">
        ${quote}
      </blockquote>
    </section>
  `;
}

function setupStoicQuoteClick() {
  const stoicQuote = document.getElementById("stoic-quote");
  if (stoicQuote) {
    stoicQuote.addEventListener("click", () => {
      const newQuote = getRandomStoicQuote();
      stoicQuote.textContent = newQuote;
    });
  }
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

// Helper function to parse finished date for sorting
function parseFinishedDate(finished) {
  if (!finished) return new Date(0);
  
  const monthNames = {
    "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
    "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
  };
  
  // Check for re-read dates first (use the most recent reading date)
  const reReadMatch = finished.match(/re-read\s+(\w+)\s+(\d{4})/);
  if (reReadMatch) {
    const reReadMonth = monthNames[reReadMatch[1]] || 0;
    const reReadYear = parseInt(reReadMatch[2], 10);
    return new Date(reReadYear, reReadMonth);
  }
  
  // Extract month and year from strings like "December 2025", "November 2025", etc.
  const match = finished.match(/(\w+)\s+(\d{4})/);
  if (!match) return new Date(0);
  
  const month = monthNames[match[1]] || 0;
  const year = parseInt(match[2], 10);
  
  return new Date(year, month);
}

// ============================================
// READING STATS UTILITY FUNCTIONS
// ============================================

function getBooksByYear(books, year) {
  return books.filter(book => {
    if (!book.finished) return false;
    // Skip books marked as "not finished"
    if (book.finished.toLowerCase().includes('not finished')) return false;
    const date = parseFinishedDate(book.finished);
    return date.getFullYear() === year;
  });
}

function getBooksPerMonth(books, year) {
  const yearBooks = getBooksByYear(books, year);
  const months = Array(12).fill(0);
  yearBooks.forEach(book => {
    const date = parseFinishedDate(book.finished);
    months[date.getMonth()]++;
  });
  return months;
}

function getTagBreakdown(books, year) {
  const yearBooks = getBooksByYear(books, year);
  const tagCounts = {};
  yearBooks.forEach(book => {
    let tags = [];
    if (book.tags && Array.isArray(book.tags) && book.tags.length > 0) {
      tags = book.tags;
    } else if (BOOK_TAGS[book.slug] && BOOK_TAGS[book.slug].length > 0) {
      tags = BOOK_TAGS[book.slug];
    }
    tags.forEach(tag => {
      // Strip emoji prefix for clean grouping
      const cleanTag = tag.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]\s*/u, '').trim();
      tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
    });
  });
  return tagCounts;
}

function getRatingDistribution(books, year) {
  const yearBooks = getBooksByYear(books, year);
  const ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  yearBooks.forEach(book => {
    if (book.rating && book.rating > 0) {
      const bucket = Math.round(book.rating);
      if (bucket >= 1 && bucket <= 5) {
        ratings[bucket]++;
      }
    }
  });
  return ratings;
}

function getAvailableYears(books) {
  const years = new Set();
  books.forEach(book => {
    if (book.finished && !book.finished.toLowerCase().includes('not finished')) {
      const date = parseFinishedDate(book.finished);
      const year = date.getFullYear();
      if (year > 2000) years.add(year);
    }
  });
  return Array.from(years).sort((a, b) => b - a);
}

async function loadReadingGoal(year) {
  try {
    const { supabase } = await import('./js/supabaseClient.js');
    const { data, error } = await supabase
      .from('reading_goals')
      .select('goal_count')
      .eq('goal_year', year)
      .single();

    if (error || !data) return null;
    return data.goal_count;
  } catch (e) {
    console.error('Error loading reading goal:', e);
    return null;
  }
}

// Generate unique visual properties for each book spine
function getSpineStyle(index, title) {
  // Use title string to seed pseudo-random values for consistency
  const seed = (title || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0) + index;

  // Varied hue rotation (-30 to +50 degrees)
  const hueShift = ((seed * 47) % 80) - 30;

  // Varied saturation via brightness (0.75 to 1.1)
  const brightness = 0.75 + ((seed * 31) % 35) / 100;

  // Varied height (80% to 115% of base)
  const heightPct = 80 + ((seed * 23) % 35);

  // Varied width (75% to 120% of base)
  const widthPct = 75 + ((seed * 13) % 45);

  return {
    hueShift,
    brightness,
    heightPct,
    widthPct,
  };
}

function renderSpineHTML(index, book, isLarge) {
  const title = book?.title || '';
  const style = getSpineStyle(index, title);
  const sizeClass = isLarge ? ' large' : '';

  return `<div class="bookshelf-spine filled${sizeClass}" style="--spine-hue-shift: ${style.hueShift}deg; --spine-brightness: ${style.brightness}; --spine-height: ${style.heightPct}%; --spine-width: ${style.widthPct}%;" title="${title}"></div>`;
}

function generateChartPalette(count, accent, secondary) {
  const baseColors = [
    accent,
    secondary,
    '#4a90d9',
    '#e67e22',
    '#27ae60',
    '#8e44ad',
    '#e74c3c',
    '#16a085',
  ];
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(baseColors[i % baseColors.length]);
  }
  return result;
}

// ============================================
// READING DASHBOARD (Full - Library Page)
// ============================================

let chartInstances = {};

async function populateReadingDashboard(books) {
  const goalContainer = document.getElementById('reading-dashboard');
  const chartsContainer = document.getElementById('reading-charts');
  if (!goalContainer && !chartsContainer) return;

  const availableYears = getAvailableYears(books);
  if (availableYears.length === 0) return;

  const currentYear = new Date().getFullYear();
  // Default to most recent year with data, not current year if it's empty
  const currentYearBooks = getBooksByYear(books, currentYear);
  const defaultYear = currentYearBooks.length > 0 ? currentYear : availableYears[0];

  // Store books for theme refresh
  window._dashboardBooks = books;

  const yearOptions = availableYears.map(y =>
    `<option value="${y}" ${y === defaultYear ? 'selected' : ''}>${y}</option>`
  ).join('');

  // Goal progress stays above the library
  if (goalContainer) {
    goalContainer.innerHTML = `
      <div class="reading-dashboard">
        <div class="dashboard-header">
          <h3>Reading Stats</h3>
          <select id="dashboard-year-filter" class="dashboard-year-select" aria-label="Filter stats by year">
            ${yearOptions}
          </select>
        </div>
        <div class="dashboard-card dashboard-bookshelf-card">
          <h4>Goal Progress</h4>
          <div id="dashboard-bookshelf"></div>
        </div>
      </div>
    `;
  }

  // Charts go below the library
  if (chartsContainer) {
    chartsContainer.innerHTML = `
      <div class="reading-dashboard reading-charts-section">
        <div class="dashboard-grid">
          <div class="dashboard-card">
            <h4>Books Per Month</h4>
            <canvas id="chart-books-per-month"></canvas>
          </div>
          <div class="dashboard-card">
            <h4>Genre Breakdown</h4>
            <canvas id="chart-genre-breakdown"></canvas>
          </div>
          <div class="dashboard-card dashboard-rating-card">
            <h4>Rating Distribution</h4>
            <canvas id="chart-rating-distribution"></canvas>
          </div>
        </div>
      </div>
    `;
  }

  await renderDashboardCharts(books, defaultYear);

  const yearSelect = document.getElementById('dashboard-year-filter');
  if (yearSelect) {
    yearSelect.addEventListener('change', async (e) => {
      const selectedYear = parseInt(e.target.value, 10);
      await renderDashboardCharts(books, selectedYear);
    });
  }
}

async function renderDashboardCharts(books, year) {
  // Destroy existing charts before re-creating
  Object.values(chartInstances).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') chart.destroy();
  });
  chartInstances = {};

  // Read CSS variables for theme-aware colors
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue('--accent').trim();
  const secondary = styles.getPropertyValue('--secondary').trim();
  const textColor = styles.getPropertyValue('--text').trim();
  const textMuted = styles.getPropertyValue('--text-muted').trim();
  const borderColor = styles.getPropertyValue('--border').trim();
  const mutedBg = styles.getPropertyValue('--muted-bg').trim();

  // --- 1. Bookshelf Goal Tracker ---
  const goal = await loadReadingGoal(year);
  const yearBooks = getBooksByYear(books, year);
  const count = yearBooks.length;
  const goalCount = goal || null;

  const bookshelfContainer = document.getElementById('dashboard-bookshelf');
  if (bookshelfContainer) {
    const maxDisplay = goalCount ? Math.max(goalCount, count) : count;
    let spinesHTML = '';
    for (let i = 0; i < maxDisplay; i++) {
      if (i < count) {
        spinesHTML += renderSpineHTML(i, yearBooks[i], true);
      } else if (goalCount && i < goalCount) {
        spinesHTML += `<div class="bookshelf-spine empty large"></div>`;
      }
    }

    const goalText = goalCount
      ? `${count}/${goalCount} books read in ${year}`
      : `${count} book${count !== 1 ? 's' : ''} read in ${year}`;

    const percentText = goalCount && goalCount > 0
      ? `<span class="goal-percent">${Math.round((count / goalCount) * 100)}% of goal</span>`
      : '';

    bookshelfContainer.innerHTML = `
      <div class="bookshelf-large">
        <div class="bookshelf-spines">${spinesHTML}</div>
        <div class="bookshelf-shelf"></div>
      </div>
      <p class="reading-goal-text">${goalText} ${percentText}</p>
    `;
  }

  // Check if Chart.js is available
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded, skipping chart rendering');
    return;
  }

  // --- 2. Books Per Month Bar Chart ---
  const monthData = getBooksPerMonth(books, year);
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthCanvas = document.getElementById('chart-books-per-month');
  if (monthCanvas) {
    chartInstances.booksPerMonth = new Chart(monthCanvas, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Books Finished',
          data: monthData,
          backgroundColor: accent,
          borderColor: accent,
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: textMuted, stepSize: 1, font: { family: '"Playfair Display", serif' } },
            grid: { color: borderColor + '40' }
          },
          x: {
            ticks: { color: textMuted, font: { family: '"Playfair Display", serif' } },
            grid: { display: false }
          }
        }
      }
    });
  }

  // --- 3. Genre/Tag Breakdown Doughnut Chart ---
  const tagData = getTagBreakdown(books, year);
  const tagLabels = Object.keys(tagData);
  const tagValues = Object.values(tagData);
  const genreColors = generateChartPalette(tagLabels.length, accent, secondary);

  const genreCanvas = document.getElementById('chart-genre-breakdown');
  if (genreCanvas && tagLabels.length > 0) {
    chartInstances.genreBreakdown = new Chart(genreCanvas, {
      type: 'doughnut',
      data: {
        labels: tagLabels,
        datasets: [{
          data: tagValues,
          backgroundColor: genreColors,
          borderColor: mutedBg,
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor,
              font: { size: 11, family: '"Playfair Display", serif' },
              padding: 12
            }
          }
        }
      }
    });
  } else if (genreCanvas) {
    // No tag data — show message
    genreCanvas.parentElement.querySelector('h4').insertAdjacentHTML(
      'afterend', '<p class="dashboard-empty-msg">No genre data for this year</p>'
    );
  }

  // --- 4. Rating Distribution Bar Chart ---
  const ratingData = getRatingDistribution(books, year);
  const ratingLabels = ['1 ★', '2 ★', '3 ★', '4 ★', '5 ★'];
  const ratingValues = [ratingData[1], ratingData[2], ratingData[3], ratingData[4], ratingData[5]];

  const ratingCanvas = document.getElementById('chart-rating-distribution');
  if (ratingCanvas) {
    chartInstances.ratingDistribution = new Chart(ratingCanvas, {
      type: 'bar',
      data: {
        labels: ratingLabels,
        datasets: [{
          label: 'Books',
          data: ratingValues,
          backgroundColor: secondary,
          borderColor: secondary,
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: textMuted, stepSize: 1, font: { family: '"Playfair Display", serif' } },
            grid: { color: borderColor + '40' }
          },
          x: {
            ticks: { color: textMuted, font: { family: '"Playfair Display", serif' } },
            grid: { display: false }
          }
        }
      }
    });
  }
}

// ============================================
// READING GOAL WIDGET (Homepage - Now Section)
// ============================================

async function populateReadingGoalWidget(books) {
  const container = document.getElementById('reading-goal-widget');
  if (!container) return;

  const currentYear = new Date().getFullYear();
  const goal = await loadReadingGoal(currentYear);
  const yearBooks = getBooksByYear(books, currentYear);
  const count = yearBooks.length;
  const goalCount = goal || 25; // Default to 25

  const maxDisplay = Math.max(goalCount, count);
  let spinesHTML = '';
  for (let i = 0; i < maxDisplay; i++) {
    if (i < count) {
      spinesHTML += renderSpineHTML(i, yearBooks[i], false);
    } else if (i < goalCount) {
      spinesHTML += `<div class="bookshelf-spine empty"></div>`;
    }
  }

  container.innerHTML = `
    <a href="?page=library" class="reading-goal-card countdown-card" aria-label="View reading stats — ${count} of ${goalCount} books read in ${currentYear}">
      <h3>📚 Reading Goal</h3>
      <div class="bookshelf-mini">
        <div class="bookshelf-spines">${spinesHTML}</div>
        <div class="bookshelf-shelf"></div>
      </div>
      <p class="reading-goal-text">${count}/${goalCount} books read in ${currentYear}</p>
    </a>
  `;
}

// ============================================
// ADMIN READING GOALS
// ============================================

async function populateAdminGoals() {
  const container = document.getElementById('admin-reading-goals');
  if (!container) return;

  try {
    const { supabase } = await import('./js/supabaseClient.js');
    const { data: goals, error } = await supabase
      .from('reading_goals')
      .select('*')
      .order('goal_year', { ascending: false });

    if (error) throw error;

    if (!goals || goals.length === 0) {
      container.innerHTML = '<p class="admin-empty">No reading goals set yet.</p>';
      return;
    }

    container.innerHTML = goals.map(goal => `
      <div class="admin-book-item">
        <div class="admin-book-info">
          <div class="admin-book-details">
            <h3>${goal.goal_year} Reading Goal</h3>
            <p>Target: ${goal.goal_count} books</p>
          </div>
        </div>
        <div class="admin-book-actions">
          <a href="/admin/edit-goal.html?year=${goal.goal_year}" class="admin-edit-btn">Edit</a>
          <button class="admin-delete-btn" data-type="reading_goal" data-item-id="${goal.id}" data-item-title="${goal.goal_year} Reading Goal">Delete</button>
        </div>
      </div>
    `).join('');

  } catch (e) {
    console.error('Error loading reading goals:', e);
    container.innerHTML = '<p class="admin-empty">Failed to load reading goals.</p>';
  }
}

function refreshDashboardChartsIfVisible() {
  const yearSelect = document.getElementById('dashboard-year-filter');
  if (yearSelect && window._dashboardBooks) {
    const year = parseInt(yearSelect.value, 10);
    renderDashboardCharts(window._dashboardBooks, year);
  }
}

function renderReadingListPage(books) {
  const bookEntries = Array.isArray(books) ? books : [];
  
  // Tag emoji mapping for display
  const tagEmojis = {
    'Business': '📈',
    'History': '🌍',
    'Society': '🌍',
    'Philosophy': '🧠',
    'Life': '💭',
    'Identity': '🎭',
    'Sports': '🏀'
  };
  
  function addEmojiToTag(tag) {
    // If tag already has emoji, return as-is
    if (/^[\u{1F300}-\u{1F9FF}]/u.test(tag)) {
      return tag;
    }
    // Try to find emoji by matching tag name
    for (const [key, emoji] of Object.entries(tagEmojis)) {
      if (tag.includes(key)) {
        return `${emoji} ${tag.replace(key, '').trim() || key}`;
      }
    }
    // No emoji found, return as-is
    return tag;
  }
  
  // Get all unique tags
  const allTags = new Set();
  bookEntries.forEach(book => {
    // Use tags from book object first, then fallback to BOOK_TAGS
    let tags = [];
    if (book.tags && Array.isArray(book.tags) && book.tags.length > 0) {
      tags = book.tags;
    } else if (BOOK_TAGS[book.slug] && BOOK_TAGS[book.slug].length > 0) {
      tags = BOOK_TAGS[book.slug];
    }
    // Add emojis for display and store both versions
    tags.forEach(tag => {
      const tagWithEmoji = addEmojiToTag(tag);
      allTags.add(tagWithEmoji);
    });
  });
  const uniqueTags = Array.from(allTags).sort();
  
  // Sort books by finished date (most recent first)
  // For books without finished date, use created_at or put them first
  const sortedBooks = [...bookEntries].sort((a, b) => {
    const dateA = a.finished ? parseFinishedDate(a.finished) : (a.created_at ? new Date(a.created_at) : new Date(0));
    const dateB = b.finished ? parseFinishedDate(b.finished) : (b.created_at ? new Date(b.created_at) : new Date(0));
    return dateB - dateA; // Most recent first
  });
  
  const bookCards = sortedBooks
    .map(
      (book) => {
        // Use tags from book object first, then fallback to BOOK_TAGS
        let tags = [];
        if (book.tags && Array.isArray(book.tags) && book.tags.length > 0) {
          tags = book.tags;
        } else if (BOOK_TAGS[book.slug] && BOOK_TAGS[book.slug].length > 0) {
          tags = BOOK_TAGS[book.slug];
        }
        // Add emojis to tags for display
        const tagsWithEmojis = tags.map(tag => {
          // If tag already has emoji, use it; otherwise add emoji
          if (/^[\u{1F300}-\u{1F9FF}]/u.test(tag)) {
            return tag;
          }
          // Try to find emoji by matching tag name
          const tagEmojis = {
            'Business': '📈',
            'History': '🌍',
            'Society': '🌍',
            'Philosophy': '🧠',
            'Life': '💭',
            'Identity': '🎭',
            'Sports': '🏀'
          };
          for (const [key, emoji] of Object.entries(tagEmojis)) {
            if (tag.includes(key)) {
              return `${emoji} ${tag.replace(key, '').trim() || key}`;
            }
          }
          return tag;
        });
        const tagsHTML = tagsWithEmojis.length > 0 
          ? `<div class="book-tags">${tagsWithEmojis.map(tag => `<span class="book-tag" data-tag="${tag}">${tag}</span>`).join("")}</div>`
          : "";
        // Only show published/finished if they have values
        const publishedText = book.published ? `<p>Published ${book.published}</p>` : '';
        const finishedText = book.finished ? `<p>Read ${book.finished}</p>` : '';
        return `
          <a class="book-card${book.pinned ? ' pinned' : ''}" href="?book=${book.slug}" aria-label="View details for ${book.title}" data-book-slug="${book.slug}">
            <img src="${book.cover || ''}" alt="Cover of ${book.title}" loading="lazy" onerror="this.style.display='none';" />
            <div class="book-overlay">
              <h3>${book.title}</h3>
              ${book.author ? `<p>${book.author}</p>` : ''}
              ${publishedText}
              ${finishedText}
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
      <div id="reading-dashboard"></div>
      <p class="library-intro">A growing collection of books that have shaped my curiosity lately.</p>
      ${filterHTML}
      <div class="book-grid" id="book-grid">${bookCards}</div>
      ${emptyState}
      <div id="reading-charts"></div>
    </section>
  `;
}

async function loadSupabaseNews() {
  try {
    const { supabase } = await import('./js/supabaseClient.js');
    if (!supabase) return [];
    
    const { data: newsData, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching news from Supabase:', error);
      return [];
    }
    
    return (newsData || []).map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      content: item.content,
      created_at: item.created_at
    }));
  } catch (error) {
    console.error('Error loading news from Supabase:', error);
    return [];
  }
}

async function loadSupabaseProjects() {
  try {
    const { supabase } = await import('./js/supabaseClient.js');
    if (!supabase) return [];
    
    const { data: projectsData, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      return [];
    }
    
    return (projectsData || []).map(item => ({
      id: item.id,
      title: item.title,
      short_description: item.short_description,
      link: item.link,
      details: item.details,
      created_at: item.created_at
    }));
  } catch (error) {
    console.error('Error loading projects from Supabase:', error);
    return [];
  }
}

// Helper function to load news from Supabase and merge with static data
async function loadAllNews(staticNews) {
  try {
    const supabaseNews = await loadSupabaseNews();
    // Merge Supabase news with static news (Supabase news first, sorted by date)
    const allNews = [...supabaseNews, ...staticNews];
    // Sort by date (most recent first)
    return allNews.sort((a, b) => {
      const dateA = new Date(a.date || '1900-01-01');
      const dateB = new Date(b.date || '1900-01-01');
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error loading news:', error);
    return staticNews;
  }
}

// Helper function to load projects from Supabase and merge with static data
async function loadAllProjects(staticProjects) {
  try {
    const supabaseProjects = await loadSupabaseProjects();
    // Merge Supabase projects with static projects (Supabase projects first)
    return [...supabaseProjects, ...staticProjects];
  } catch (error) {
    console.error('Error loading projects:', error);
    return staticProjects;
  }
}

function renderAdminDashboard(books, news = [], projects = []) {
  // Filter to only show Supabase books (those with id from Supabase)
  const supabaseBooks = books.filter(book => book.id);
  
  const booksList = supabaseBooks.length > 0
    ? supabaseBooks.map(book => `
        <div class="admin-book-item" data-book-id="${book.id || ''}">
          <div class="admin-book-info">
            <img src="${book.cover || ''}" alt="${book.title}" class="admin-book-cover" onerror="this.style.display='none';" />
            <div class="admin-book-details">
              <h3>${book.title}</h3>
              ${book.author ? `<p>by ${book.author}</p>` : ''}
              ${book.created_at ? `<p class="admin-book-meta">Added: ${new Date(book.created_at).toLocaleDateString()}</p>` : ''}
            </div>
          </div>
          <div class="admin-book-actions">
            <a href="/admin/edit-book.html?id=${book.id}" class="admin-edit-btn">Edit</a>
            <button class="admin-delete-btn" data-type="book" data-item-id="${book.id || ''}" data-item-title="${book.title}" aria-label="Delete ${book.title}">
              Delete
            </button>
          </div>
        </div>
      `).join('')
    : '<p class="admin-empty">No books from Supabase yet. Add books via the admin form.</p>';

  const newsList = news.length > 0
    ? news.map(item => `
        <div class="admin-book-item" data-news-id="${item.id || ''}">
          <div class="admin-book-info">
            <div class="admin-book-details">
              <h3>${item.title}</h3>
              ${item.date ? `<p>Date: ${item.date}</p>` : ''}
              ${item.created_at ? `<p class="admin-book-meta">Added: ${new Date(item.created_at).toLocaleDateString()}</p>` : ''}
            </div>
          </div>
          <div class="admin-book-actions">
            <a href="/admin/edit-news.html?id=${item.id}" class="admin-edit-btn">Edit</a>
            <button class="admin-delete-btn" data-type="news" data-item-id="${item.id || ''}" data-item-title="${item.title}" aria-label="Delete ${item.title}">
              Delete
            </button>
          </div>
        </div>
      `).join('')
    : '<p class="admin-empty">No news items from Supabase yet. Add news via the admin form.</p>';

  const projectsList = projects.length > 0
    ? projects.map(item => `
        <div class="admin-book-item" data-project-id="${item.id || ''}">
          <div class="admin-book-info">
            <div class="admin-book-details">
              <h3>${item.title}</h3>
              ${item.short_description ? `<p>${item.short_description.substring(0, 100)}${item.short_description.length > 100 ? '...' : ''}</p>` : ''}
              ${item.created_at ? `<p class="admin-book-meta">Added: ${new Date(item.created_at).toLocaleDateString()}</p>` : ''}
            </div>
          </div>
          <div class="admin-book-actions">
            <a href="/admin/edit-project.html?id=${item.id}" class="admin-edit-btn">Edit</a>
            <button class="admin-delete-btn" data-type="project" data-item-id="${item.id || ''}" data-item-title="${item.title}" aria-label="Delete ${item.title}">
              Delete
            </button>
          </div>
        </div>
      `).join('')
    : '<p class="admin-empty">No projects from Supabase yet. Add projects via the admin form.</p>';
  
  return `
    <section id="admin-dashboard">
      <div class="admin-header">
        <h2 class="section-title">Admin Dashboard</h2>
        <button id="admin-logout-btn" class="admin-logout-btn">Logout</button>
      </div>
      <div class="admin-actions">
        <a href="/admin/add-book.html" class="admin-action-link">+ Add New Book</a>
        <a href="/admin/add-news.html" class="admin-action-link">+ Add New News</a>
        <a href="/admin/add-project.html" class="admin-action-link">+ Add New Project</a>
      </div>
      <div class="admin-books-list">
        <h3>Supabase Books (${supabaseBooks.length})</h3>
        ${booksList}
      </div>
      <div class="admin-books-list" style="margin-top: 32px;">
        <h3>Supabase News (${news.length})</h3>
        ${newsList}
      </div>
      <div class="admin-books-list" style="margin-top: 32px;">
        <h3>Supabase Projects (${projects.length})</h3>
        ${projectsList}
      </div>
      <div class="admin-books-list" style="margin-top: 32px;">
        <h3>Reading Goals</h3>
        <div id="admin-reading-goals">
          <p class="admin-empty">Loading goals...</p>
        </div>
        <a href="/admin/edit-goal.html" class="admin-action-link" style="margin-top: 16px; display: inline-block;">+ Set Reading Goal</a>
      </div>
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
  const reflectionSection = book.reflection && book.reflection.trim()
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
          <img src="${book.cover || ''}" alt="Cover of ${book.title}" onerror="this.style.display='none';" />
        </div>
        <div class="book-detail-info">
          <h1>${book.title}</h1>
          ${book.author ? `<p class="book-author">by ${book.author}</p>` : ''}
          ${book.published ? `<p class="book-meta">Published ${book.published}</p>` : ''}
          ${book.finished ? `<p class="book-meta">Read ${book.finished}</p>` : ''}
          ${book.rating ? `<div class="book-rating" aria-label="Rated ${book.rating} out of 5 stars">
            ${renderRatingStars(book.rating)}
          </div>` : ''}
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
      const selectedTag = btn.getAttribute("data-tag");
      const isCurrentlyActive = btn.classList.contains("active");
      
      // If clicking the already active button, deselect and show all
      if (isCurrentlyActive && selectedTag !== "all") {
        filterButtons.forEach(b => b.classList.remove("active"));
        // Find and activate the "all" button
        const allBtn = document.querySelector('.filter-btn[data-tag="all"]');
        if (allBtn) allBtn.classList.add("active");
        
        // Show all books
        bookCards.forEach(card => {
          card.style.display = "";
        });
        return;
      }
      
      // Update active state
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      bookCards.forEach(card => {
        if (selectedTag === "all") {
          card.style.display = "";
        } else {
          const cardTags = card.querySelectorAll(".book-tag");
          // Check if any tag matches (with or without emoji)
          const hasTag = Array.from(cardTags).some(tagEl => {
            const tagValue = tagEl.getAttribute("data-tag");
            // Remove emoji for comparison
            const tagWithoutEmoji = tagValue.replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, '').trim();
            const selectedWithoutEmoji = selectedTag.replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, '').trim();
            return tagValue === selectedTag || tagWithoutEmoji === selectedWithoutEmoji;
          });
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

      <div class="now-widgets">
        ${renderReadingGoalWidget()}
        ${renderSpotifyWidget()}
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
  // Ensure project has details object
  if (!project.details) {
    console.error('Project missing details:', project);
    return `<section id="project-details">
      <h2>Error</h2>
      <p>Project details are missing.</p>
      <a href="?page=projects">Back to Projects</a>
    </section>`;
  }
  
  const details = project.details;
  const technologies = details.technologies || [];
  const logos = details.logos || [];
  
  return `
    <section id="project-details">
      <h2>${details.title || project.title || 'Untitled Project'}</h2>
      <p>${details.description || ''}</p>
      ${technologies.length > 0 ? `
      <h3>Technologies Used:</h3>
      <ul>
        ${technologies.map((tech) => `<li>${tech}</li>`).join("")}
      </ul>
      ` : ''}
      ${logos.length > 0 ? `
      <div class="logo-grid">
        ${logos.map((logo) => {
          const imgTag = `<img src="${logo.src}" alt="${logo.alt || ''}" style="${logo.style || ""}" class="${(logo.alt || '').toLowerCase().replace(/\s+/g, "-")}" />`;
          return logo.link
            ? `<a href="${logo.link}" target="_blank">${imgTag}</a>`
            : imgTag;
        }).join("")}
      </div>
      ` : ''}

      <a href="?page=projects">Back to Projects</a>
    </section>
  `;
}

// Initialize theme on page load
initializeTheme();

// Initialize global features
setupKeyboardNavigation();
setupSwipeDetection();

// Helper function to load books from Supabase and merge with static data
async function loadLibraryBooks(staticBooks) {
  try {
    // Dynamically import Supabase client
    const { supabase } = await import('./js/supabaseClient.js');
    
    // Fetch books from Supabase
    const { data: supabaseBooks, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching books from Supabase:', error);
      return staticBooks;
    }
    
    // Transform Supabase books to match expected format
    const transformedBooks = (supabaseBooks || []).map(book => {
      // Generate slug from title
      const slug = book.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      return {
        id: book.id, // Store Supabase ID for deletion
        slug: slug,
        title: book.title,
        author: book.author || '',
        published: book.published || '',
        finished: book.finished || '',
        cover: book.cover_url || '',
        summary: book.description || '',
        rating: book.rating || null,
        review: book.review || '',
        reflection: book.reflection || '',
        pinned: book.pinned || false,
        pdf: book.pdf || null,
        tags: book.tags || [],
        created_at: book.created_at || null
      };
    });
    
    // Merge Supabase books with static books (Supabase books first)
    return [...transformedBooks, ...staticBooks];
  } catch (error) {
    console.error('Error loading books from Supabase:', error);
    return staticBooks;
  }
}

// Show loading screen
const loadingInterval = showLoadingScreen();

fetch("data.json")
  .then((response) => response.json())
  .then(async (data) => {
    const params = new URLSearchParams(window.location.search);
    const projectLink = params.get("project");
    const page = params.get("page");
    const bookSlug = params.get("book");
    const main = document.querySelector("main");
    
    // For admin page, we need to check admin status first
    // For all other pages, check in background (non-blocking)
    let isAdmin = false;
    
    if (page === "admin") {
      // For admin page, wait for check with timeout
      try {
        isAdmin = await Promise.race([
          checkIsAdmin(),
          new Promise((resolve) => setTimeout(() => resolve(false), 2000)) // 2 second timeout
        ]);
      } catch (error) {
        console.error('Error checking admin status:', error);
        isAdmin = false;
      }
      
      if (!isAdmin) {
        // Not admin - redirect to home
        window.location.href = '/?page=home';
        hideLoadingScreen(loadingInterval);
        return;
      }
      // Load all books, news, and projects for admin dashboard
      Promise.all([
        loadLibraryBooks(data.readingList || []),
        loadSupabaseNews(),
        loadSupabaseProjects()
      ]).then(([allBooks, news, projects]) => {
        setNavbar(data.navigation, "admin", isAdmin);
        main.innerHTML = renderAdminDashboard(allBooks, news, projects);
        setupAdminDeleteButtons();
        setupAdminLogout();
        populateAdminGoals();
        hideLoadingScreen(loadingInterval);
      }).catch((error) => {
        console.error('Error loading data for admin:', error);
        setNavbar(data.navigation, "admin", isAdmin);
        main.innerHTML = renderAdminDashboard([], [], []);
        setupAdminLogout();
        hideLoadingScreen(loadingInterval);
      });
      return;
    }
    
    // For all other pages, check admin status in background (non-blocking)
    // Don't show admin tab until check completes
    checkIsAdmin().then(result => {
      isAdmin = result;
      // Only update navbar if user is actually an admin
      if (result) {
        const currentPage = page || (projectLink ? "home" : (bookSlug ? "library" : "home"));
        setNavbar(data.navigation, currentPage, isAdmin);
      }
    }).catch(error => {
      console.error('Error checking admin status:', error);
      // On error, ensure admin tab is not shown
      isAdmin = false;
    });
    
    if (projectLink) {
      // Decode the project link in case it's URL encoded
      let decodedProjectLink;
      try {
        decodedProjectLink = decodeURIComponent(projectLink);
      } catch (e) {
        decodedProjectLink = projectLink;
      }
      
      // Load projects to check if project exists in merged data
      loadAllProjects(data.projects || []).then((allProjects) => {
        console.log('Looking for project with link:', decodedProjectLink, 'Total projects:', allProjects.length);
        console.log('Project links:', allProjects.map(p => ({ link: p.link, id: p.id, title: p.title })));
        
        // Try to find project by link (for both static and Supabase projects)
        let project = allProjects.find((proj) => {
          if (!proj.link) return false;
          // Compare both encoded and decoded versions
          const projLink = proj.link;
          try {
            const decodedProjLink = decodeURIComponent(projLink);
            return projLink === decodedProjectLink || 
                   projLink === projectLink || 
                   decodedProjLink === decodedProjectLink ||
                   decodedProjLink === projectLink;
          } catch (e) {
            return projLink === decodedProjectLink || projLink === projectLink;
          }
        });
        
        // If not found by link, try to find by ID (for Supabase projects using ID as link)
        if (!project) {
          project = allProjects.find((proj) => proj.id && (proj.id.toString() === decodedProjectLink || proj.id.toString() === projectLink));
        }
        
        if (project) {
          console.log('Found project:', project.title, project);
          setNavbar(data.navigation, "home", false);
          try {
            main.innerHTML = renderProjectPage(project);
            hideLoadingScreen(loadingInterval);
          } catch (error) {
            console.error('Error rendering project page:', error, project);
            renderMain(data, false).then(() => {
              hideLoadingScreen(loadingInterval);
            }).catch((err) => {
              console.error('Error rendering main:', err);
              hideLoadingScreen(loadingInterval);
            });
          }
        } else {
          console.error('Project not found. Looking for:', decodedProjectLink, 'Available projects:', allProjects.map(p => ({ link: p.link, id: p.id, title: p.title })));
          renderMain(data, false).then(() => {
            hideLoadingScreen(loadingInterval);
          }).catch((error) => {
            console.error('Error rendering main:', error);
            hideLoadingScreen(loadingInterval);
          });
          return;
        }
      }).catch((error) => {
        console.error('Error loading projects:', error);
        // Fallback to static projects only
        const project = data.projects.find((proj) => proj.link === decodedProjectLink || proj.link === projectLink);
        if (project) {
          setNavbar(data.navigation, "home", false);
          try {
            main.innerHTML = renderProjectPage(project);
            hideLoadingScreen(loadingInterval);
          } catch (err) {
            console.error('Error rendering project page:', err);
            renderMain(data, false).then(() => {
              hideLoadingScreen(loadingInterval);
            });
          }
        } else {
          renderMain(data, false).then(() => {
            hideLoadingScreen(loadingInterval);
          }).catch((error) => {
            console.error('Error rendering main:', error);
            hideLoadingScreen(loadingInterval);
          });
          return;
        }
      });
      return; // Don't hide loading screen yet, wait for async load
    } else if (bookSlug) {
      // Load books from Supabase and static data to find the book
      setNavbar(data.navigation, "library", false); // Don't show admin tab until check completes
      loadLibraryBooks(data.readingList || []).then((allBooks) => {
        console.log('Loaded books:', allBooks.length, 'Looking for slug:', bookSlug);
        const book = allBooks.find((item) => item.slug === bookSlug);
        if (book) {
          console.log('Found book:', book.title);
          main.innerHTML = renderBookPage(book);
        } else {
          console.log('Book not found, showing library page');
          main.innerHTML = renderReadingListPage(allBooks);
          setTimeout(() => { setupLibraryFilters(); populateReadingDashboard(allBooks); }, 100);
        }
        hideLoadingScreen(loadingInterval);
      }).catch((error) => {
        console.error('Error loading library books:', error);
        // Fallback to static data
        const book = (data.readingList || []).find((item) => item.slug === bookSlug);
        if (book) {
          main.innerHTML = renderBookPage(book);
        } else {
          const fallbackBooks = data.readingList || [];
          main.innerHTML = renderReadingListPage(fallbackBooks);
          setTimeout(() => { setupLibraryFilters(); populateReadingDashboard(fallbackBooks); }, 100);
        }
        hideLoadingScreen(loadingInterval);
      });
      return; // Don't hide loading screen yet, wait for async load
    } else if (page === "library") {
      setNavbar(data.navigation, "library", false); // Don't show admin tab until check completes
      // Fetch books from Supabase and merge with static data
      loadLibraryBooks(data.readingList || []).then((allBooks) => {
        main.innerHTML = renderReadingListPage(allBooks);
        setTimeout(() => { setupLibraryFilters(); populateReadingDashboard(allBooks); }, 100);
        hideLoadingScreen(loadingInterval);
      }).catch((error) => {
        console.error('Error loading library books:', error);
        // Fallback to static data
        const fallbackBooks = data.readingList || [];
        main.innerHTML = renderReadingListPage(fallbackBooks);
        setTimeout(() => { setupLibraryFilters(); populateReadingDashboard(fallbackBooks); }, 100);
        hideLoadingScreen(loadingInterval);
      });
      return; // Don't hide loading screen yet, wait for async load
    } else if (page === "projects") {
      setNavbar(data.navigation, "projects", false); // Don't show admin tab until check completes
      // Load projects from Supabase and merge with static data
      loadAllProjects(data.projects || []).then((allProjects) => {
        main.innerHTML = renderProjectsPage(allProjects);
        hideLoadingScreen(loadingInterval);
      }).catch((error) => {
        console.error('Error loading projects:', error);
        main.innerHTML = renderProjectsPage(data.projects || []);
        hideLoadingScreen(loadingInterval);
      });
      return; // Don't hide loading screen yet, wait for async load
    } else if (page === "now") {
      setNavbar(data.navigation, "home", false); // Don't show admin tab until check completes
      main.innerHTML = renderNowPage();
      loadSpotifyData();
    } else if (page === "home") {
      renderMain(data, false).then(() => {
        hideLoadingScreen(loadingInterval);
      }).catch((error) => {
        console.error('Error rendering main:', error);
        hideLoadingScreen(loadingInterval);
      });
      return; // Don't hide loading screen yet, wait for async load
    } else {
      renderMain(data, false).then(() => {
        hideLoadingScreen(loadingInterval);
      }).catch((error) => {
        console.error('Error rendering main:', error);
        hideLoadingScreen(loadingInterval);
      });
      return; // Don't hide loading screen yet, wait for async load
    }

    // Hide loading screen
    hideLoadingScreen(loadingInterval);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    hideLoadingScreen(loadingInterval);
  });

function renderNews(news) {
  return `
    <section id="news">
      <h2 class="section-title">News</h2>
      <div class="search">
        <input type="search" name="news" id="news-search" placeholder="Search News..." />
      </div>
      <ul class="newslist">
        ${news.slice(0, 5).map((item) => renderNewsItems(item)).join("")}
      </ul>
    </section>
  `;
}

function renderNowSection(today = new Date(), phases = computePhases(today)) {
  const graduationDate = new Date("2026-05-18");
  const showGradCountdown = today < graduationDate;

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
      <small>${gradProgress}% of college completed (since Aug 22, 2022)</small>
    </div>`
    : "";

  const countdownHTML = renderCountdownWidget(phases, today, gradCountdown);

  return countdownHTML;
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
    
    // Re-attach event listeners after re-rendering
    attachNewsToggleListeners();
  });
  
  // Attach initial event listeners
  attachNewsToggleListeners();
}

function attachNewsToggleListeners() {
  const showMoreLinks = document.querySelectorAll(".show-more");
  showMoreLinks.forEach(link => {
    // Remove existing listeners by cloning
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    // Add new event listener
    newLink.addEventListener("click", function(event) {
      event.preventDefault();
      event.stopPropagation();
      const content = this.nextElementSibling;
      if (content && content.classList.contains('news-content')) {
        if (content.style.display === "none" || !content.style.display) {
          content.style.display = "block";
          this.textContent = "Show Less";
        } else {
          content.style.display = "none";
          this.textContent = "Show More";
        }
      }
      return false;
    });
  });
}

function renderNewsItems(newsItem) {
  return `
    <li>
      <strong>${newsItem.title}</strong>
      <em>${newsItem.date || "Unknown Date"}</em>
      <a href="#" class="show-more">Show More</a>
      <p class="news-content" style="display: none;">${newsItem.content}</p>
    </li>
  `;
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
  // Find Winter Break and BC Spring Semester indexes for default display
  const winterBreakIndex = phases.findIndex(p => p.name.includes("Winter Break"));
  const bcSpringIndex = phases.findIndex(p => p.name.includes("BC Senior Spring Semester"));
  const hasCurrentPhase = phases.some(p => p.isCurrent);
  
  // Default to first current phase, or Winter Break if no current phase (and it exists), or BC Spring as last resort
  let defaultIndex = 0;
  if (hasCurrentPhase) {
    defaultIndex = phases.findIndex(p => p.isCurrent);
  } else if (winterBreakIndex >= 0) {
    defaultIndex = winterBreakIndex;
  } else if (bcSpringIndex >= 0) {
    defaultIndex = bcSpringIndex;
  }
  
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

      // Show the default phase (current phase or BC Spring if no current)
      const shouldShow = i === defaultIndex;

      return `<div class="countdown-card phase-card" data-index="${i}" style="display: ${
        shouldShow ? "block" : "none"
      };">${content}</div>`;
    })
    .join("");

  return `
    <section id="life-countdown">
      <h2 class="section-title">Now</h2>
      <p class="now-subtext">Just trying to soak it all in</p>
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

function renderReadingGoalWidget() {
  const READING_GOAL = 25;
  const BOOKS_READ = 2; // Update this manually or fetch from data

  // Generate book spines with varied heights, colors, and widths
  const bookColors = [
    '#8B4513', '#654321', '#A0522D', '#8B7355', '#CD853F',
    '#DEB887', '#D2691E', '#BC8F8F', '#8B4726', '#A0826D',
    '#9B7653', '#C19A6B', '#826644', '#6F4E37', '#704214',
    '#3D2B1F', '#8B5A2B', '#A67B5B', '#6E5547', '#8B7D6B',
    '#9C8169', '#BAA898', '#A8826D', '#AA895E', '#967969'
  ];

  const books = Array.from({ length: READING_GOAL }, (_, i) => {
    const isRead = i < BOOKS_READ;
    const height = 60 + Math.random() * 40; // Random height between 60-100px
    const width = 20 + Math.random() * 15; // Random width between 20-35px
    const color = bookColors[i % bookColors.length];
    const spineText = generateSpineText();

    return `
      <div class="book-spine ${isRead ? 'read' : 'unread'}"
           style="height: ${height}px; width: ${width}px; background-color: ${color};">
        <span class="spine-text">${spineText}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="reading-goal-card">
      <h3>📚 Reading Goal</h3>
      <div class="bookshelf">
        <div class="books-container">
          ${books}
        </div>
        <div class="shelf-surface"></div>
      </div>
      <p class="reading-progress">${BOOKS_READ}/${READING_GOAL} books read in 2026</p>
    </div>
  `;
}

function generateSpineText() {
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
  const vowels = 'AEIOU';
  let text = '';
  const length = 3 + Math.floor(Math.random() * 4); // 3-6 characters

  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      text += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      text += vowels[Math.floor(Math.random() * vowels.length)];
    }
  }

  return text;
}

function renderSpotifyWidget() {
  return `
    <div class="spotify-widget-card">
      <h3>🎵 What I'm Listening To</h3>
      <div id="spotify-content" class="spotify-loading">
        <div class="loading-spinner"></div>
        <p>Loading music...</p>
      </div>
    </div>
  `;
}

async function loadSpotifyData() {
  const spotifyContent = document.getElementById('spotify-content');
  if (!spotifyContent) return;

  try {
    // Option C: Fetch from a simple endpoint that returns your top tracks or recently played
    // This endpoint will be a simple JSON file or a lightweight serverless function
    // that updates periodically (e.g., every hour via a cron job)

    const response = await fetch('/spotify-data.json');

    if (!response.ok) {
      throw new Error('Failed to fetch Spotify data');
    }

    const data = await response.json();

    if (data.currentTrack) {
      spotifyContent.innerHTML = renderNowPlaying(data.currentTrack);
    } else if (data.recentTracks && data.recentTracks.length > 0) {
      spotifyContent.innerHTML = renderTopTracks(data.recentTracks);
    } else {
      spotifyContent.innerHTML = '<p class="spotify-empty">No recent activity</p>';
    }
  } catch (error) {
    console.error('Error loading Spotify data:', error);
    // Show a static placeholder instead of an error
    spotifyContent.innerHTML = renderPlaceholderTrack();
  }
}

function renderNowPlaying(data) {
  return `
    <div class="spotify-track">
      <div class="spotify-album-art">
        <img src="${data.albumArt}" alt="Album art for ${data.album}" />
        <div class="now-playing-indicator">
          <span class="pulse"></span>
          <span class="pulse"></span>
          <span class="pulse"></span>
        </div>
      </div>
      <div class="spotify-info">
        <div class="spotify-track-name">${data.trackName}</div>
        <div class="spotify-artist">${data.artist}</div>
        <div class="spotify-album">${data.album}</div>
        <div class="spotify-status">
          <span class="playing-badge">Now Playing</span>
        </div>
      </div>
    </div>
  `;
}

function renderRecentTrack(data) {
  return `
    <div class="spotify-track">
      <div class="spotify-album-art">
        <img src="${data.albumArt}" alt="Album art for ${data.album}" />
      </div>
      <div class="spotify-info">
        <div class="spotify-track-name">${data.trackName}</div>
        <div class="spotify-artist">${data.artist}</div>
        <div class="spotify-album">${data.album}</div>
        <div class="spotify-status">
          <span class="recent-badge">Recently Played</span>
        </div>
      </div>
    </div>
  `;
}

function renderTopTracks(tracks) {
  // Show the most recent track
  const track = tracks[0];
  return renderRecentTrack(track);
}

function renderPlaceholderTrack() {
  // Fallback when Spotify data isn't available
  return `
    <div class="spotify-track">
      <div class="spotify-album-art">
        <div class="placeholder-art">🎵</div>
      </div>
      <div class="spotify-info">
        <div class="spotify-track-name">Connect Spotify</div>
        <div class="spotify-artist">Set up your Spotify integration to display music</div>
        <div class="spotify-status">
          <span class="recent-badge">Setup Required</span>
        </div>
      </div>
    </div>
  `;
}

function attachPhaseNavigation(phases) {
  const cards = document.querySelectorAll(".phase-card");
  // Find current phase, defaulting to Winter Break or BC Spring Semester if none
  let current = phases.findIndex((p) => p.isCurrent);
  if (current === -1) {
    // Default to Winter Break if it exists, otherwise BC Spring Semester
    const winterBreakIndex = phases.findIndex(p => p.name.includes("Winter Break"));
    const bcSpringIndex = phases.findIndex(p => p.name.includes("BC Senior Spring Semester"));
    if (winterBreakIndex >= 0) {
      current = winterBreakIndex;
    } else if (bcSpringIndex >= 0) {
      current = bcSpringIndex;
    } else {
      current = phases.length - 1;
    }
    // Show the default card
    if (cards.length > 0 && cards[current]) {
      cards[current].style.display = 'block';
    }
  }

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
    // Re-render dashboard charts if visible (theme colors changed)
    refreshDashboardChartsIfVisible();
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

// Setup admin delete buttons
function setupAdminDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.admin-delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const itemType = this.getAttribute('data-type') || 'book';
      const itemId = this.getAttribute('data-item-id');
      const itemTitle = this.getAttribute('data-item-title');
      
      if (!itemId) {
        alert(`Cannot delete: ${itemType} ID not found. This item may be from static data.`);
        return;
      }
      
      if (!confirm(`Are you sure you want to delete "${itemTitle}"? This action cannot be undone.`)) {
        return;
      }
      
      try {
        const { supabase } = await import('./js/supabaseClient.js');
        
        // Determine the table name
        const tableName = itemType === 'book' ? 'books' : (itemType === 'news' ? 'news' : (itemType === 'reading_goal' ? 'reading_goals' : 'projects'));
        
        // Delete from Supabase
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', itemId);
        
        if (error) {
          throw error;
        }
        
        // Remove from UI
        const itemElement = this.closest('.admin-book-item');
        if (itemElement) {
          itemElement.style.transition = 'opacity 0.3s';
          itemElement.style.opacity = '0';
          setTimeout(() => {
            itemElement.remove();
            // Reload the page to refresh the list
            window.location.reload();
          }, 300);
        }
      } catch (error) {
        console.error(`Error deleting ${itemType}:`, error);
        alert(`Failed to delete ${itemType}: ${error.message}`);
      }
    });
  });
}

function setupAdminLogout() {
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function() {
      if (!confirm('Are you sure you want to logout?')) {
        return;
      }
      
      try {
        const { supabase } = await import('./js/supabaseClient.js');
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          throw error;
        }
        
        // Redirect to home page
        window.location.href = '/?page=home';
      } catch (error) {
        console.error('Error logging out:', error);
        alert(`Failed to logout: ${error.message}`);
      }
    });
  }
}

// Hidden admin trigger: 5 clicks within 2 seconds on footer (Library page only)
(function() {
  let clickCount = 0;
  let clickTimer = null;
  
  function resetCounter() {
    clickCount = 0;
    if (clickTimer) {
      clearTimeout(clickTimer);
      clickTimer = null;
    }
  }
  
  function handleFooterClick() {
    // Only activate on library page
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    const bookSlug = params.get("book");
    if (page !== "library" && !bookSlug) {
      return;
    }
    
    clickCount++;
    
    if (clickCount === 1) {
      clickTimer = setTimeout(resetCounter, 2000);
    }
    
    if (clickCount >= 5) {
      resetCounter();
      window.location.href = "/admin/login.html";
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.addEventListener("click", handleFooterClick);
    }
  });
})();
