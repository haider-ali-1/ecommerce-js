import { getCart, qs } from "./utils.js";

export function updateCartUI() {
  const cartElement = qs(".cart span");
  cartElement.textContent = String(getCart().length);
}
