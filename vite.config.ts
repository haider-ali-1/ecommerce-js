import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        cart: resolve(__dirname, "cart.html"),
        login: resolve(__dirname, "login.html"),
        product: resolve(__dirname, "product.html"),
        products: resolve(__dirname, "products.html"),
        profile: resolve(__dirname, "profile.html"),
        signup: resolve(__dirname, "signup.html"),
      },
    },
  },
});
