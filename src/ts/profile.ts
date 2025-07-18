import { qs } from "../utils";

const profileEl = qs<HTMLElement>(".profile");
const nameEl = qs<HTMLParagraphElement>(".name");
const emailEl = qs<HTMLParagraphElement>(".email");
const logoutBtn = qs<HTMLButtonElement>(".logout");

const isUserLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")!);

if (!isUserLoggedIn) {
  profileEl.textContent = "Please Login";
} else {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")!);
  nameEl.textContent = "Name: " + currentUser.name;
  emailEl.textContent = "Email: " + currentUser.email;
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cart");
  window.location.href = "./login.html";
});
