import { getCart, qs } from "../utils";

const cartElement = qs<HTMLSpanElement>(".cart span");

export function updateCartUI() {
  cartElement.textContent = String(getCart().length);
}

updateCartUI();

