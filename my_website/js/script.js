/* Orbitlane landing page behavior
   - Mobile nav toggle
   - Reveal-on-scroll
   - Footer year
   - Demo form (client-side demo alert)
*/

(() => {
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");

  if (menuButton && menu) {
    const closeMenu = () => {
      menu.classList.add("hidden");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("hidden");
    });

    // Close menu when a link is clicked
    menu.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.matches('a[href^="#"]')) {
        closeMenu();
      }
    });

    // Close menu on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Demo form: keep behavior (no backend)
  const demoForm = document.querySelector("[data-demo-form]");
  if (demoForm instanceof HTMLFormElement) {
    demoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.alert("Thanks — we received your request (demo form).");
    });
  }

  // Reveal-on-scroll
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    if (revealEls.length) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12 }
      );

      for (const el of revealEls) {
        io.observe(el);
      }
    }
  } else {
    // Ensure visible if motion is reduced (CSS defaults already do, but be explicit)
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();

