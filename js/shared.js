import { qs, storage } from "./utils.js";

export function updateCartUI() {
  const isLoggedIn = storage.get("isLoggedIn");
  if (isLoggedIn) {
    const cartElement = qs(".cart span");
    cartElement.textContent = storage.get("cart")?.length || 0;
  }
}
