import { products } from "./data.js";
import { qs, storage } from "./utils.js";
import { RenderCartItems } from "./cart-core.js";
import { toggleCart } from "./cart-drawer.js";
import { updateCartUI } from "./shared.js";

const productsEl = qs(".products");

function RenderProducts() {
  for (const p of products) {
    const product = `<div class="product" data-id=${p.id}>
                        <a href="./product.html?id=${p.id}">
                        <div><img src=${p.image} alt="" srcset="" /></div>
                        <p class="name">${p.name}</p>
                          <span class="price">$${p.price}</span>
                        </a>
                        <button class="cart-btn" data-id=${p.id}>Add to Cart</button>
                    </div>`;
    productsEl.innerHTML += product;
  }
}

RenderProducts();
updateCartUI();

productsEl.addEventListener("click", (e) => {
  const el = e.target;

  if (!el.matches(".cart-btn")) {
    return;
  }

  const isLoggedIn = storage.get("isLoggedIn");
  if (!isLoggedIn) {
    location.href = "login.html";
    return;
  }

  const cart = storage.get("cart", []);
  const id = el.dataset.id;

  if (!id) {
    return;
  }

  const foundItemIndex = cart.findIndex((ci) => ci.id === id);
  const obj = { id, quantity: 1 };

  if (foundItemIndex !== -1) {
    cart[foundItemIndex].quantity += 1;
  } else {
    cart.push(obj);
  }

  storage.set("cart", cart);

  toggleCart();
  RenderCartItems();
  updateCartUI();
});
