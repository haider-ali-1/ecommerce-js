import { qs, storage, createEl } from "./utils.js";

const cartItemsEl = qs(".cart-section .cart-items");
const summaryEl = qs(".cart-section .summary");
const navigationEl = qs(".cart-section .navigation");

function getPopulatedData() {
  const cart = storage.get("cart", []);
  const products = storage.get("products", []);

  const data = cart.map((ci) => {
    const fp = products.find((p) => p.id === ci.id);
    return fp ? { ...fp, quantity: ci.quantity } : null;
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

function updateSummary(totalItems, totalPrice) {
  summaryEl.innerHTML = `<p>Total Items: <span>${totalItems}</span></p>
                       <p>Total Price: <span>$${totalPrice}</span></p>`;
}

function RenderCartItems() {
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

function RenderSummary(totalItems, totalPrice) {
  summaryEl.innerHTML = `<p>Total Items: <span>${totalItems}</span></p>
                       <p>Total Price: <span>$${totalPrice}</span></p>`;
}

export { getPopulatedData, updateCart, RenderCartItems, RenderSummary };
