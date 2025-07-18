import type { User } from "../types";
import { qs, getUsers, setValue, getCart } from "../utils";

const nameInput = qs<HTMLInputElement>(".name");
const emailInput = qs<HTMLInputElement>(".email");
const passwordInput = qs<HTMLInputElement>(".password");
const signupBtn = qs<HTMLButtonElement>(".signup-btn");

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // check email availability
  const users = getUsers();
  const foundUser = users.find((u) => {
    return u.email === email;
  });
  if (foundUser) {
    alert(`${email} already exist`);
    return;
  }

  // User Object
  const user: User = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(user);
  setValue("users", users);
  window.location.href = "./login.html"
});

