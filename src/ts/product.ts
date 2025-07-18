import { getCart, getProducts, qs, setValue } from "../utils";
import { updateCartUI } from "./shared";

const imageEl = qs<HTMLImageElement>(".image-wrapper img");
const nameEl = qs<HTMLParagraphElement>(".name");
const descriptionEl = qs<HTMLParagraphElement>(".description");
const priceEl = qs<HTMLParagraphElement>(".price");
const cartBtn = qs<HTMLButtonElement>(".add-to-cart");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const id = params.get("id");
if (!id) throw new Error("Missing product ID");

function renderProduct() {
  const products = getProducts();
  const foundProduct = products.find((p) => p.id === id);
  if (!foundProduct) {
    alert("Product not found");
    window.location.href = "./products.html";
    return;
  }

  imageEl.src = `${foundProduct.image}`;
  imageEl.alt = `${foundProduct.name}`;
  nameEl.textContent = `${foundProduct.name}`;
  descriptionEl.textContent = `${foundProduct.description}`;
  priceEl.textContent = `$${foundProduct.price}`;
}

cartBtn.addEventListener("click", () => {
  const quantity = +(cartBtn.previousElementSibling as HTMLInputElement).value;

  if (!quantity || quantity <= 0) {
    alert("Minimum 1 quantity is required");
    return;
  }

  const cart = getCart();
  const cartItemIndex = cart.findIndex((i) => i.id === id);

  if (cartItemIndex !== -1) {
    cart[cartItemIndex].quantity += quantity;
  } else {
    cart.push({ id, quantity });
  }

  setValue("cart", cart);
  updateCartUI();
});

renderProduct();
