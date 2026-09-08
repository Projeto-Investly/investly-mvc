const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
        const aberto = mobileMenu.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
}
