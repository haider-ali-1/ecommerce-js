import type { CartItem } from "../interfaces";
import { createEl, getCart, getProducts, qs, setValue } from "../utils";

const cartItemsDiv = qs<HTMLElement>(".cart-items");
const totalItemsElement = qs<HTMLSpanElement>(".total-items");
const priceElement = qs<HTMLParagraphElement>(".total-price");

const cartSectionContainer = qs<HTMLDivElement>(".cart-section-container");

function RenderUpdatedCartItems() {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn") || "false");
  if (!isLoggedIn) {
    cartSectionContainer.innerHTML = "";
    const p = createEl("p");
    p.style.fontSize = "1.8rem";
    p.style.fontWeight = "bold";
    p.textContent = "Please Login First";
    cartSectionContainer.appendChild(p);
    return;
  }

  const cart = getCart();
  if (!cart.length) {
    cartSectionContainer.innerHTML = "";
    const p = createEl("p");
    p.textContent = "Cart is Empty";
    cartSectionContainer.appendChild(p);
    p.style.fontSize = "1.8rem";
    p.style.fontWeight = "bold";
    return;
  }

  cartItemsDiv.innerHTML = "";

  // get relationship data
  const cartItems = getCompleteData();
  cartItems.forEach((i) => {
    const cartItem = `<div class="cart-item" data-id=${i.id}>
                            <p>${i.name}</p>
                            <img src=${i.image} alt="">
                            <p>${i.price}$</p>
                            <input type=number value=${i.quantity} min=1 />
                            <button class=remove>Remove</button>
                        </div>`;
    cartItemsDiv.innerHTML += cartItem;
  });

  console.log(cartItems);
  updateSummary();
}

RenderUpdatedCartItems();

cartItemsDiv.addEventListener("click", (e) => {
  const removeBtn = (e.target as HTMLElement).closest(".remove");
  const itemId = String(removeBtn?.parentElement?.getAttribute("data-id"));

  if (removeBtn) {
    deleteCart(itemId);
    RenderUpdatedCartItems();
    updateSummary();
  }
});

cartItemsDiv.addEventListener("change", (e) => {
  const input = e.target as HTMLInputElement;
  const itemId = String(input.parentElement?.getAttribute("data-id"));
  updateCart(itemId, +input.value);
  updateSummary();
});

function deleteCart(id: string) {
  const itemsAfterDelete = getCart().filter((i) => i.id !== id);
  setValue("cart", itemsAfterDelete);
}

function updateCart(itemId: string, value: number) {
  const cartItems = getCart();
  const result = cartItems.map((i) => {
    return { id: i.id, quantity: itemId === i.id ? value : i.quantity };
  });
  setValue("cart", result);
}

function getCompleteData() {
  let cartItems: CartItem[] = [];
  const cart = getCart();
  cart.forEach((ci) => {
    const products = getProducts();
    const p = products.find((p) => p.id === ci.id);
    if (p) {
      cartItems.push({ ...p, quantity: ci.quantity });
    }
  });
  return cartItems;
}

function updateSummary() {
  const cartItems = getCompleteData();
  const totalPrice = cartItems.reduce((acc, ci) => {
    return acc + ci.quantity * ci.price;
  }, 0);

  const totalItems = cartItems.reduce((acc, ci) => {
    return acc + ci.quantity;
  }, 0);

  totalItemsElement.textContent = totalItems.toString();
  priceElement.textContent = totalPrice.toString();
}
