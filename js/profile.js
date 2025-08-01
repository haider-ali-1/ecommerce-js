import { createEl, qs, storage } from "./utils.js";
import { updateCartUI } from "./shared.js";

const cart = qs(".cart");
const profileEl = qs(".profile");
const nameEl = qs(".profile .name");
const emailEl = qs(".profile .email");
const logoutBtn = qs(".profile .logout");
const ordersEl = qs(".profile-container .orders");

const isUserLoggedIn = storage.get("isLoggedIn", false);
if (!isUserLoggedIn) {
  profileEl.textContent = "Please Login";
  cart.style.display = "none";
} else {
  const currentUser = storage.get("currentUser", {});
  nameEl.textContent = "Name: " + currentUser.name;
  emailEl.textContent = "Email: " + currentUser.email;
  RenderOrders();
  updateCartUI();
}

logoutBtn.addEventListener("click", () => {
  storage.remove("isLoggedIn");
  storage.remove("currentUser");
  storage.remove("orders");
  storage.remove("cart");
  location.href = "login.html";
});

function getPopulatedData() {
  const orders = storage.get("orders", []);
  const products = storage.get("products", []);

  const data = orders.map((order) => {
    const productsData = order.items.map((item) => {
      const fp = products.find((p) => p.id === item.id);
      return { ...fp, quantity: item.quantity };
    });
    const formattedDate = new Date(order.placedAt).toLocaleDateString();
    return { ...order, items: productsData, placedAt: formattedDate };
  });
  return data;
}

function RenderOrders() {
  const orders = getPopulatedData();

  if (!orders.length) {
    ordersEl.innerHTML = "";
    return;
  }

  const headings = ["Order ID", "Items", "Sub Total", "Order Date"];

  const table = createEl("table");
  const thead = createEl("thead");
  const headerRow = createEl("tr");

  headings.forEach((key) => {
    const th = createEl("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);
  ordersEl.appendChild(table);

  const tbody = createEl("tbody");

  orders.forEach((o) => {
    const tr = createEl("tr");
    Object.entries(o).forEach(([key, val]) => {
      let value = val;
      if (Array.isArray(val)) {
        value = val.map((v) => `${v.name} [${v.quantity}]`).join(", ");
      }

      if (key === "subTotal") {
        value = `$${val}`;
      }

      const td = createEl("td");
      td.textContent = value;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    table.appendChild(tbody);
  });
}
