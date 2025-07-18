import { products } from "../data";
import { qs, getCart, setValue } from "../utils/index";

const productsDiv = qs<HTMLDivElement>(".products");
const cartElement = qs<HTMLSpanElement>(".cart span");

for (const p of products) {
  const product = `<div class="product" data-id=${p?.id}>
                      <a href="./product.html?id=${p?.id}">
                        <p class="name">${p?.name}</p>
                        <img src=${p?.image} alt="" srcset="" />
                        <span class="price">$${p?.price}</span>
                      </a>
                      <div>
                        <input type="number" value=1 min=1 class=quantity />
                        <button class="add-cart-btn" >Add to Cart</button>
                      </div>
                    </div>`;
  productsDiv.innerHTML += product;
}

productsDiv.addEventListener("click", (e) => {
  const el = e.target as HTMLButtonElement;
  const clickCartBtn = el.matches(".add-cart-btn");

  if (clickCartBtn) {
    // getting relevant data
    const id = el.parentElement?.parentElement?.getAttribute("data-id");
    const noOfItems = parseInt(
      (el.previousElementSibling as HTMLInputElement).value
    );

    // check if item already in cart
    const cart = getCart();
    const cartItemFound = cart.find((i) => i.id === id);
    cartItemFound
      ? (cartItemFound.quantity += noOfItems)
      : cart.push({ id: id!, quantity: noOfItems });
    setValue("cart", cart);
    updateCartUI();
  }
});

function updateCartUI() {
  cartElement.textContent = String(getCart().length);
}

updateCartUI();
