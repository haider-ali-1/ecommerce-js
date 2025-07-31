import { updateCartUI } from "./shared.js";
import { qs, setValue, createEl, storage } from "./utils.js";

const mainEl = qs("main");
const emailInput = qs(".email");
const passwordInput = qs(".password");
const signInForm = qs(".form");
const containerEl = qs("main .container");

function isLoggedIn() {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (isLoggedIn) {
    containerEl.innerHTML = "";
    const p = createEl("p");
    p.textContent = "Already Logged In";
    p.style.fontSize = "1.8rem";
    p.style.textAlign = "center";
    p.style.marginBlock = "2rem";
    containerEl.appendChild(p);
    mainEl.appendChild(containerEl);
    return;
  }
}

isLoggedIn();
updateCartUI();

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const users = storage.get("users", []);

  // check is user found
  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    alert("Incorrect email or password");
    return;
  }

  setValue("currentUser", {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
  });

  setValue("isLoggedIn", true);
  location.href = "products.html";
});
