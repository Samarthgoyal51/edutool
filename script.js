document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle with localStorage
  const themeSwitch = document.getElementById("themeSwitch");
  const currentTheme = localStorage.getItem("theme") || "light";

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", () => {
    const newTheme = themeSwitch.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // Smooth scrolling for nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Parallax effect for hero section
  const heroLayers = document.querySelectorAll(".parallax-layer");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    heroLayers.forEach((layer, index) => {
      const speed = (index + 1) * 0.15;
      layer.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });

  // Lazy load images
  const lazyImages = document.querySelectorAll("img[loading='lazy']");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach((img) => imageObserver.observe(img));

  // Tool card animations
  const toolCards = document.querySelectorAll(".tool-card");
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  toolCards.forEach((card) => cardObserver.observe(card));

  // Contact form validation and submission
  const contactForm = document.querySelector(".contact-form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.querySelector("input[name='name']").value;
    const email = contactForm.querySelector("input[name='email']").value;
    const message = contactForm.querySelector("textarea[name='message']").value;

    if (name.length < 2) {
      alert("Please enter a valid name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (message.length < 10) {
      alert("Please enter a message with at least 10 characters.");
      return;
    }

    // Placeholder for form submission (e.g., API call)
    alert("Thank you for your message! We'll respond soon.");
    contactForm.reset();
  });

  // Inject animation styles
  const style = document.createElement("style");
  style.innerHTML = `
        .tool-card {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .tool-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);
});
