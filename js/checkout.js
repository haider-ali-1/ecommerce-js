import { updateCartUI } from "./shared.js";
import {
  createEl,
  getCart,
  getProducts,
  qs,
  setValue,
  storage,
} from "./utils.js";

const itemsContainerEl = qs(".items");
const formBtn = qs("form");

const isUserLoggedIn = storage.get("isLoggedIn", false);
if (!isUserLoggedIn) {
  location.href = "login.html";
}

const cart = getCart();
const products = getProducts();

const productsData = cart.map((co) => {
  const product = products.find((p) => p.id === co.id);

  const totalPricePerItem = product.price * co.quantity;
  return {
    ...product,
    quantity: co.quantity,
    totalPerItem: totalPricePerItem,
  };
});
const totalItems = productsData.reduce((acc, p) => {
  return acc + p.quantity;
}, 0);
const totalPrice = productsData.reduce((acc, p) => {
  return acc + p.totalPerItem;
}, 0);

function RenderCheckOut() {
  itemsContainerEl.innerHTML = "";
  productsData.forEach((p) => {
    const productItem = `<div class="item">
                          <img src=${p.image} alt=${p.name} />
                          <div>
                            <p class="quantity">${p.quantity}</p>
                            <p class="quantity">x</p>
                            <p class="price">$${p.price}</p>
                            <p>=</p>
                            <p class="total">$${p.totalPerItem}</p>
                          </div>
                        </div>`;
    itemsContainerEl.innerHTML += productItem;
  });

  const summary = createEl("div");
  summary.innerHTML = `<p class="total-quantity">Total Items: <span>${totalItems}</span></p>
                        <p class="total-price">Total Price: <span>$${totalPrice}</span></p>`;
  itemsContainerEl.appendChild(summary);
}

RenderCheckOut();
updateCartUI();

formBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const order = {
    orderId: String(orders.length + 1).padStart(3, "0"),
    items: getCart(),
    subTotal: totalPrice,
    placedAt: new Date().toISOString(),
  };

  orders.push(order);
  setValue("orders", orders);
  setValue("cart", []);
  location.href = "profile.html";
});
