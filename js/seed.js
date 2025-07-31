import { products } from "./data.js";
import { getProducts, setValue } from "./utils.js";

function seedProductsData() {
  const data = getProducts();
  if (data.length) return;
  setValue("products", products);
}

seedProductsData();
