// select items
const hamburger = document.querySelector(".hamburger");
const navContainer = document.querySelector(".nav-container");
const links = document.querySelectorAll(".nav-link");

// toogle haburger menu and mobile nav items
hamburger.addEventListener("click", toggleMenu);

function toggleMenu() {
  hamburger.classList.toggle("active");
  navContainer.classList.toggle("active");
}

//click on each link close mobile nav
let menuMobile = false;
links.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.stopPropagation();
    if (menuMobile) {
      hamburger.classList.add("active");
      menuMobile = true;
    } else {
      hamburger.classList.remove("active");
      menuMobile = false;
    }
    navContainer.classList.remove("active");
  });
});
