import { qs } from "../utils";

const title = qs<HTMLHeadingElement>("h1");

title.addEventListener("click", () => {
  window.location.href = "./products.html";
});
