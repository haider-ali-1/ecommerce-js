import { storage, qs } from "./utils.js";

const links = document.querySelectorAll(".nav-items a");
const cartEl = qs("header .cart");
const profileEl = qs("header .profile");

for (const link of links) {
  const activePageHref = location.pathname.split("/").at(-1);
  const linkHref = link.getAttribute("href").split("/").at(-1);
  const isFirstPage = activePageHref === "";
  if (linkHref === activePageHref || isFirstPage) {
    link.classList.add("active");
    break;
  }
}

const isLoggedIn = storage.get("isLoggedIn");
if (!isLoggedIn) {
  [cartEl, profileEl].forEach((el) => (el.style.display = "none"));
}
