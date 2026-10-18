document.addEventListener("DOMContentLoaded", () => {
  // DARK MODE TOGGLE
  const toggle = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        body.classList.contains("dark-mode") ? "enabled" : "disabled"
      );
    });
  }

  // NAVBAR TOGGLE (Home Page)
  const homeHamburger = document.querySelector(".home-navbar .hamburger");
  const homeNavLinks = document.querySelector(".home-navbar .nav-links");
  if (homeHamburger && homeNavLinks) {
    homeHamburger.addEventListener("click", () => {
      homeNavLinks.classList.toggle("active");
    });
  }

  // LESSON NAVBAR TOGGLE
  const lessonHamburgerNav = document.getElementById("lessonNavbarHamburger");
  const lessonNavLinks = document.querySelector(".lesson-navbar .nav-links");
  if (lessonHamburgerNav && lessonNavLinks) {
    lessonHamburgerNav.addEventListener("click", () => {
      lessonNavLinks.classList.toggle("active");
    });
    lessonNavLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        lessonNavLinks.classList.remove("active");
      });
    });
  }

  // SIDEBAR TOGGLE
  const sidebarHamburger = document.getElementById("lessonSidebarHamburger");
  const lessonSidebar = document.querySelector(".lesson-sidebar");
  const overlay = document.querySelector(".lesson-overlay");
  if (sidebarHamburger && lessonSidebar) {
    sidebarHamburger.addEventListener("click", () => {
      lessonSidebar.classList.toggle("active");
      if (overlay) overlay.classList.toggle("active");
    });
  }
  if (overlay) {
    overlay.addEventListener("click", () => {
      lessonSidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  // SCROLL ANIMATIONS
  const animatedElements = document.querySelectorAll(".scroll-animate");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) =>
        entry.target.classList.toggle("visible", entry.isIntersecting)
      ),
    { threshold: 0.15 }
  );
  animatedElements.forEach((el) => observer.observe(el));

  // QUIZ LOGIC
  const quizzes = document.querySelectorAll(".quiz-container");
  const wrapper = document.getElementById("quiz-wrapper");
  let currentQuiz = 0;
  let score = 0;

  if (quizzes.length > 0) {
    quizzes.forEach((q, i) => (q.style.display = i === 0 ? "block" : "none"));

    quizzes.forEach((quiz) => {
      const options = quiz.querySelectorAll(".quiz-option");
      options.forEach((option) => {
        option.addEventListener("click", () => {
          const isCorrect = option.getAttribute("data-correct") === "true";
          option.style.backgroundColor = isCorrect ? "green" : "red";
          if (isCorrect) score++;
          options.forEach((opt) => (opt.style.pointerEvents = "none"));

          setTimeout(() => {
            quiz.style.display = "none";
            currentQuiz++;
            if (currentQuiz < quizzes.length) {
              quizzes[currentQuiz].style.display = "block";
            } else {
              showResult();
            }
          }, 800);
        });
      });
    });
  }

  function showResult() {
    const percentage = Math.round((score / quizzes.length) * 100);
    wrapper.innerHTML = `
      <div class="quiz-result">
        <h2>Quiz Completed 🎉</h2>
        <p>You scored:</p>
        <div class="quiz-percentage">${percentage}%</div>
        <p>${score} out of ${quizzes.length} correct</p>
        <button id="retryBtn">Retry Quiz</button>
      </div>
    `;

    document.getElementById("retryBtn").addEventListener("click", () => {
      score = 0;
      currentQuiz = 0;
      wrapper.innerHTML = "";
      quizzes.forEach((q, i) => {
        q.style.display = i === 0 ? "block" : "none";
        q.querySelectorAll(".quiz-option").forEach((opt) => {
          opt.style.pointerEvents = "auto";
          opt.style.backgroundColor = "";
        });
        wrapper.appendChild(q);
      });
    });
  }
});
