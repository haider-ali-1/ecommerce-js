import { getCart, getProducts, qs, setValue, storage } from "./utils.js";
import { updateCartUI } from "./shared.js";

const productContainerEl = qs(".product-container");

// check product id is in url
const params = new URLSearchParams(location.search);
const id = params.get("id");
if (!id) throw new Error("Missing product ID");

function RenderProduct() {
  const products = getProducts();
  const foundProduct = products.find((p) => p.id === id);
  // check if id is not correct
  if (!foundProduct) {
    alert("Product not found");
    location.href = "products.html";
    return;
  }

  productContainerEl.innerHTML = `<div class="image-wrapper">
                                    <img src=${foundProduct.image} alt=${foundProduct.name} />
                                  </div>
                                  <div class="product-details">
                                    <p class="name">${foundProduct.name}</p>
                                    <p class="description">${foundProduct.description}</p>
                                    <p class="price">Price: <span>$${foundProduct.price}</span></p>
                                    <p class="brand">Brand: <span>${foundProduct.brand}</span></p>
                                    <button class="add-to-cart">Add to cart</button>
                                </div>`;
}

RenderProduct();
updateCartUI();

productContainerEl.addEventListener("click", (e) => {
  const cartBtnClick = e.target.matches(".add-to-cart");

  if (cartBtnClick) {
    // check if user logged in
    const isLoggedIn = storage.get("isLoggedIn");
    if (!isLoggedIn) {
      location.href = "login.html";
      return;
    }

    const cart = getCart();
    const cartItemIndex = cart.findIndex((i) => i.id === id);

    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity += 1;
    } else {
      cart.push({ id, quantity: 1 });
    }

    setValue("cart", cart);
    alert("add to cart successfully");
    updateCartUI();
  }
});
