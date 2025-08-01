import { qs, storage } from "./utils.js";
import {
  RenderCartItems,
  updateCart,
  getPopulatedData,
  RenderSummary,
} from "./cart-core.js";
import { updateCartUI } from "./shared.js";

const overlayEl = qs(".overlay");
const cartSectionEl = qs("main > .cart-section");
const closeCartBtn = qs(".cart-section > .cart-close-btn");
const cartItemsEl = qs(".cart-section .cart-items");
const cartEl = qs("header .cart");

export const toggleCart = () => {
  overlayEl.classList.toggle("active");
  cartSectionEl.classList.toggle("active");
};

cartItemsEl.addEventListener("change", (e) => {
  const el = e.target;

  const index = Number(el.dataset.index);
  const value = +el.value;
  if (+el.value < 1) {
    el.value = "1";
    return;
  }
  updateCart(index, value);

  const cartItems = getPopulatedData();
  const totalItems = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, ci) => acc + ci.price * ci.quantity,
    0
  );

  RenderSummary(totalItems, totalPrice);
});

// increase or decrease items on click
cartItemsEl.addEventListener("click", (e) => {
  const el = e.target;

  if (el.closest("input")) {
    return;
  }

  const action = el?.dataset?.action;
  const index = Number(el?.dataset?.index);

  const cart = storage.get("cart", []);

  console.log("clicked", action);

  if (action === "increase") {
    cart[index].quantity += 1;
  } else if (action === "decrease") {
    if (cart[index].quantity === 1) {
      return;
    }
    cart[index].quantity -= 1;
  } else if (action === "remove") {
    cart.splice(index, 1);
  }
  
  storage.set("cart", cart);
  RenderCartItems();
  updateCartUI();
});

RenderCartItems();

[overlayEl, closeCartBtn].forEach((el) =>
  el.addEventListener("click", toggleCart)
);

cartEl.addEventListener("click", toggleCart);
