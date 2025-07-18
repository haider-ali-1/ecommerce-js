import { products } from "../data";
import { getProducts, setValue } from "../utils";

function seedProductsData() {
  const data = getProducts();
  if (data.length) return;
  setValue("products", products);
}

seedProductsData();
