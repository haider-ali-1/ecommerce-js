import { updateCartUI } from "./shared.js";
import { qs, getUsers, setValue } from "./utils.js";

const nameInput = qs(".name");
const emailInput = qs(".email");
const passwordInput = qs(".password");
const signUpForm = qs(".form");

updateCartUI();

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // check email availability
  const users = getUsers();
  const foundUser = users.find((u) => u.email === email);
  if (foundUser) {
    alert(`email ${email} already exist`);
    return;
  }

  // User Object
  const user = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(user);
  setValue("users", users);
  alert("account created successfully!");
  location.href = "login.html";
});
