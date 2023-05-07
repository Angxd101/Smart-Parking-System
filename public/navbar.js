const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show-menu");
});

window.addEventListener("click", (event) => {
  if (event.target !== navToggle && event.target !== navMenu) {
    navMenu.classList.remove("show-menu");
  }
});
