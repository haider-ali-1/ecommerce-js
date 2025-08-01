import { updateCartUI } from "./shared.js";
import { createEl, qs, storage } from "./utils.js";
import { getPopulatedData, updateCart, RenderSummary } from "./cart-core.js";

const cartItemsDiv = qs(".cart-items");
const summaryEl = qs(".summary");
const checkoutBtn = qs(".checkout-btn");
const cartSectionContainer = qs(".cart-section-container");

// if user not logged in then redirect to login page
const isLoggedIn = storage.get("isLoggedIn", false);
if (!isLoggedIn) location.href = "login.html";

// function getPopulatedData() {
//   const cart = storage.get("cart", []);
//   const products = storage.get("products", []);

//   const data = cart
//     .map((ci) => {
//       const fp = products.find((p) => p.id === ci.id);
//       return fp ? { ...fp, quantity: ci.quantity } : null;
//     })
//     .filter((i) => {
//       return i !== null;
//     });

//   return data;
// }

// function updateCart(index, value) {
//   const cart = storage.get("cart", []);
//   cart[index].quantity = value;
//   storage.set("cart", cart);

//   const populatedData = getPopulatedData();
//   const cartItem = populatedData[index];

//   const decreaseBtn = qs(
//     `.cart-item[data-id=${cartItem.id}] button[data-action="decrease"]`
//   );
//   const price = qs(`.cart-item[data-id=${cartItem.id}] .price`);

//   decreaseBtn.disabled = cartItem.quantity < 2;
//   price.textContent = `$${cartItem.price * value}`;
// }

// function RenderSummary(totalItems, totalPrice) {
//   summaryEl.innerHTML = `<p>Total Items: <span>${totalItems}</span></p>
//                        <p>Total Price: <span>$${totalPrice}</span></p>`;
// }

function RenderCartItems() {
  const cart = storage.get("cart", []);
  if (!cart.length) {
    cartSectionContainer.innerHTML = "";
    const p = createEl("p");
    p.textContent = "Cart is Empty";
    cartSectionContainer.appendChild(p);
    p.style.fontSize = "1.8rem";
    p.style.fontWeight = "bold";
    return;
  }

  // get populated data
  const cartItems = getPopulatedData();
  cartItemsDiv.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  cartItems.forEach((i, index) => {
    const totalPrice = i.quantity * i.price;
    total += totalPrice;
    totalItems += i.quantity;

    const product = `<div class="cart-item" data-id=${i.id}>
                      <div class="img-wrapper">
                        <img src=${i.image} alt=${i.name} />
                      </div>
                      <div class="info">
                        <div>
                          <p class="name">${i.name}</p>
                          <div class="quantity-controls">
                            <button data-action="decrease" data-index=${index} ${
      i.quantity < 2 ? "disabled" : ""
    }>-</button>
                            <input type="number" min=1 step=1 data-index=${index} value=${
      i.quantity
    } />
                            <button data-action="increase" data-index=${index}>+</button>
                          </div>
                        </div>
                        <div>
                        <p class="price">$${i.price * i.quantity}</p>
                          <button class="remove-btn" data-action="remove" data-index=${index}><i class="fa-solid fa-xmark" data-action="remove"></i></button>
                        </div>
                      </div>
                    </div>`;
    cartItemsDiv.innerHTML += product;
  });

  RenderSummary(totalItems, total);
  updateCartUI();
}

RenderCartItems();
updateCartUI();

cartItemsDiv.addEventListener("change", (e) => {
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

cartItemsDiv.addEventListener("click", (e) => {
  const el = e.target;

  if (el.closest("input")) {
    return;
  }

  const action = el?.dataset?.action;
  const index = Number(el?.dataset?.index);

  const cart = storage.get("cart", []);

  if (action === "increase") {
    cart[index].quantity += 1;
  } else if (action === "decrease") {
    if (cart[index].quantity === 1) {
      return;
    }
    cart[index].quantity -= 1;
  } else if (action === "remove") {
    cart.splice(index, 1);
  } else {
    return;
  }

  storage.set("cart", cart);
  RenderCartItems();
});

checkoutBtn.addEventListener("click", () => {
  location.href = "checkout.html";
});
