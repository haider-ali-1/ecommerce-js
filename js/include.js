import { qs } from "../utils";

export function fetchHeader() {
  const header = qs<HTMLElement>("header");
  fetch("./src/partials/header.html")
    .then((res) => res.text())
    .then((html) => {
      header.innerHTML = html;
    });
}
