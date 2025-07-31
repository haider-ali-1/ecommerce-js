import { qs, storage, createEl, getCart } from "./utils.js";

const overlay = qs(".overlay");
const cartSectionEl = qs(".cart-section");
const closeCartBtn = qs(".cart-close-btn");
const cartItemsEl = qs(".cart-items");
const summaryEl = qs(".summary");
const navigationEl = qs(".navigation");
const cartEl = qs(".cart");

function getPopulatedData() {
  const cart = storage.get("cart", []);
  const products = storage.get("products", []);

  const data = cart
    .map((ci) => {
      const fp = products.find((p) => p.id === ci.id);
      return fp ? { ...fp, quantity: ci.quantity } : null;
    })
    .filter((i) => {
      return i !== null;
    });

  return data;
}

function updateCart(index, value) {
  const cart = storage.get("cart", []);
  cart[index].quantity = value;
  storage.set("cart", cart);

  const populatedData = getPopulatedData();
  const cartItem = populatedData[index];

  const decreaseBtn = qs(
    `.cart-item[data-id=${cartItem.id}] button[data-action="decrease"]`
  );
  const price = qs(`.cart-item[data-id=${cartItem.id}] .price`);

  decreaseBtn.disabled = cartItem.quantity < 2;
  price.textContent = `$${cartItem.price * value}`;
}

export function RenderCartItems() {
  const cart = storage.get("cart", []);
  if (!cart.length) {
    cartItemsEl.innerHTML = "";
    const p = createEl("p");
    p.textContent = "Cart is Empty";
    cartItemsEl.appendChild(p);
    p.style.fontSize = "1.8rem";
    p.style.fontWeight = "bold";

    summaryEl.style.display = "none";
    navigationEl.style.display = "none";

    return;
  }

  summaryEl.style.display = "flex";
  navigationEl.style.display = "flex";

  // get populated data
  const cartItems = getPopulatedData();
  cartItemsEl.innerHTML = "";

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
                          <button class="remove-btn" data-action="remove" data-index=${index}><i class="fa-solid fa-xmark" data-action="remove"></i></button>
                        </div>
                        <div>
                          <div class="quantity-controls">
                            <button data-action="decrease" data-index=${index} ${
      i.quantity < 2 ? "disabled" : ""
    }>-</button>
                            <input type="number" min=1 step=1 data-index=${index} value=${
      i.quantity
    } />
                            <button data-action="increase" data-index=${index}>+</button>
                          </div>
                          <p class="price">$${i.price * i.quantity}</p>
                        </div>
                      </div>
                    </div>`;
    cartItemsEl.innerHTML += product;
  });

  RenderSummary(totalItems, total);
}

export function toggleCart() {
  overlay.classList.toggle("active");
  cartSectionEl.classList.toggle("active");
}

function RenderSummary(totalItems, totalPrice) {
  summaryEl.innerHTML = `<p>Total Items: <span>${totalItems}</span></p>
                       <p>Total Price: <span>$${totalPrice}</span></p>`;
}

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
});

[overlay, closeCartBtn].forEach((el) => {
  el.addEventListener("click", () => {
    toggleCart();
  });
});

RenderCartItems();

cartEl.addEventListener("click", () => {
  toggleCart();
});
