diff --git a/main.js b/main.js
index 35896dd8fe763f3571cdc71d35f536dd224be20f..1f6e5a7eab599b82f4fab84312d18801154cc8d8 100644
--- a/main.js
+++ b/main.js
@@ -1,34 +1,40 @@
-function renderNavbar(navigation) {
+function renderNavbar(navigation, activeKey = null) {
   return `
     <nav>
       <ul>
         ${navigation
           .map(
-            (item) => `
-          <li><a href="${item.href}">${item.text}</a></li>
-        `
+            (item) => {
+              const classes = [item.class, item.key && item.key === activeKey ? "active" : ""]
+                .filter(Boolean)
+                .join(" ");
+              const ariaCurrent = item.key && item.key === activeKey ? ' aria-current="page"' : "";
+              return `
+          <li${classes ? ` class="${classes}"` : ""}><a href="${item.href}"${ariaCurrent}>${item.text}</a></li>
+        `;
+            }
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
@@ -66,90 +72,181 @@ function renderAbout(about) {
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
 
-function renderProjectPage(project) {
+function renderReadingListPage(books, navigation) {
+  const bookEntries = Array.isArray(books) ? books : [];
+  const bookCards = bookEntries
+    .map(
+      (book) => `
+          <a class="book-card" href="?book=${book.slug}" aria-label="View details for ${book.title}">
+            <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy" />
+            <div class="book-overlay">
+              <h3>${book.title}</h3>
+              <p>${book.author}</p>
+              <p>Published ${book.published}</p>
+              <p>Read ${book.finished}</p>
+            </div>
+          </a>
+        `
+    )
+    .join("");
+
+  const emptyState = bookEntries.length
+    ? ""
+    : '<p class="reading-list-empty">My reading list is under construction — check back soon for more favorites!</p>';
+
+  return `
+    ${renderNavbar(navigation, "reading-list")}
+    <section id="reading-list">
+      <h2 class="section-title">Reading List</h2>
+      <p class="reading-list-intro">A growing collection of books that have shaped my curiosity lately.</p>
+      <div class="book-grid">${bookCards}</div>
+      ${emptyState}
+    </section>
+  `;
+}
+
+function renderBookPage(book, navigation) {
   return `
+    ${renderNavbar(navigation, "reading-list")}
+    <section id="book-detail" class="book-detail">
+      <a href="?page=reading-list" class="reading-list-back" aria-label="Back to Reading List">
+        ← Back to Reading List
+      </a>
+      <div class="book-detail-content">
+        <div class="book-detail-cover">
+          <img src="${book.cover}" alt="Cover of ${book.title}" />
+        </div>
+        <div class="book-detail-info">
+          <h1>${book.title}</h1>
+          <p class="book-author">by ${book.author}</p>
+          <p class="book-meta">Published ${book.published}</p>
+          <p class="book-meta">Read ${book.finished}</p>
+          <div class="book-rating" aria-label="Rated ${book.rating} out of 5 stars">
+            ${renderRatingStars(book.rating)}
+          </div>
+          <h2>Summary</h2>
+          <p>${book.summary}</p>
+          <h2>My Thoughts</h2>
+          <p>${book.review}</p>
+        </div>
+      </div>
+    </section>
+  `;
+}
+
+function renderRatingStars(rating) {
+  const stars = [];
+  for (let i = 1; i <= 5; i++) {
+    if (rating >= i) {
+      stars.push('<span class="star full">★</span>');
+    } else if (rating >= i - 0.5) {
+      stars.push('<span class="star half">★</span>');
+    } else {
+      stars.push('<span class="star empty">★</span>');
+    }
+  }
+
+  const ratingLabel = Number.isInteger(rating) ? rating.toFixed(0) : rating.toFixed(1);
+  return `<div class="rating-stars" aria-hidden="true">${stars.join("")}</div><span class="rating-value">${ratingLabel} / 5</span>`;
+}
+
+function renderProjectPage(project, navigation) {
+  return `
+    ${renderNavbar(navigation)}
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
 
       <a href="index.html">Back to Projects</a>
     </section>
   `;
 }
 
 fetch("data.json")
   .then((response) => response.json())
   .then((data) => {
     const params = new URLSearchParams(window.location.search);
     const projectLink = params.get("project");
+    const page = params.get("page");
+    const bookSlug = params.get("book");
+    const main = document.querySelector("main");
 
     if (projectLink) {
       const project = data.projects.find((proj) => proj.link === projectLink);
       if (project) {
-        document.querySelector("main").innerHTML = renderProjectPage(project);
+        main.innerHTML = renderProjectPage(project, data.navigation);
       } else {
         renderMain(data);
       }
+    } else if (bookSlug) {
+      const book = (data.readingList || []).find((item) => item.slug === bookSlug);
+      if (book) {
+        main.innerHTML = renderBookPage(book, data.navigation);
+      } else {
+        main.innerHTML = renderReadingListPage(data.readingList || [], data.navigation);
+      }
+    } else if (page === "reading-list") {
+      main.innerHTML = renderReadingListPage(data.readingList || [], data.navigation);
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
