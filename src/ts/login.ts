import { getUsers, qs, setValue, createEl } from "../utils";

const mainEl = qs<HTMLDivElement>("main");
const emailInput = qs<HTMLInputElement>(".email");
const passwordInput = qs<HTMLInputElement>(".password");
const loginBtn = qs<HTMLInputElement>(".login-btn");

const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")!);

function RenderLoginForm() {
  if (isLoggedIn) {
    mainEl.innerHTML = "";
    const p = createEl("p");
    p.textContent = "Already Logged In";
    p.style.fontSize = "1.8rem";
    p.style.textAlign = "center";
    p.style.marginBlock = "2rem";
    mainEl.appendChild(p);
    return;
  }
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const users = getUsers();

    // check is user found
    const foundUser = users.find((u) => {
      return u.email === email && u.password === password;
    });

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
    window.location.href = "./products.html";
  });
}

RenderLoginForm();
