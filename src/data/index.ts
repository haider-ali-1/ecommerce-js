import type { Product } from "../interfaces";

const products: Product[] = [
  // 📱 Electronics
  {
    id: "e1",
    category: "Electronics",
    name: "Smartphone X100",
    brand: "TechBrand",
    price: 599,
    image: "./src/images/x100.png",
    description: "Powerful smartphone with a stunning display and long-lasting battery.",
    variations: {
      colors: ["Black", "Silver"],
      storage: ["64GB", "128GB"],
    },
  },
  {
    id: "e2",
    category: "Electronics",
    name: "Wireless Earbuds",
    brand: "SoundTech",
    price: 89,
    image: "./src/images/wireless_earbuds.jpg",
    description: "Noise-canceling wireless earbuds with premium sound quality.",
    variations: {
      colors: ["White", "Black"],
    },
  },
  {
    id: "e3",
    category: "Electronics",
    name: "Smartwatch FitPro",
    brand: "TimeTech",
    price: 149,
    image: "./src/images/smartwatch_fitpro.jpg",
    description: "Feature-rich smartwatch with fitness tracking and heart-rate monitor.",
    variations: {
      colors: ["Black", "Pink", "Navy"],
    },
  },

  // 💻 Computers
  {
    id: "c1",
    category: "Computers",
    name: "Ultrabook Pro 14",
    brand: "CompMaster",
    price: 1299,
    image: "./src/images/ultrabookpro14.jpg",
    description: "Lightweight ultrabook with powerful performance and sleek design.",
    variations: {
      ram: ["8GB", "16GB"],
      storage: ["256GB SSD", "512GB SSD"],
      colors: ["Silver", "Space Gray"],
    },
  },
  {
    id: "c2",
    category: "Computers",
    name: "Gaming Laptop G5",
    brand: "BeastTech",
    price: 1499,
    image: "./src/images/gaminglaptop.png",
    description: "High-performance gaming laptop with top-tier graphics and cooling system.",
    variations: {
      ram: ["16GB", "32GB"],
      storage: ["512GB SSD", "1TB SSD"],
      gpu: ["RTX 4060", "RTX 4070"],
    },
  },
  {
    id: "c3",
    category: "Computers",
    name: "Mechanical Keyboard",
    brand: "KeyWorks",
    price: 89,
    image: "./src/images/mechanical_keyboard.jpg",
    description: "Durable mechanical keyboard with customizable RGB lighting.",
    variations: {
      switches: ["Red", "Blue", "Brown"],
    },
  },

  // 👕 Fashion
  {
    id: "f1",
    category: "Fashion",
    name: "Men's T-Shirt",
    brand: "StyleWear",
    price: 25,
    image: "./src/images/mens-t-shirt.png",
    description: "Comfortable and stylish cotton T-shirt for everyday wear.",
    variations: {
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Blue", "Black"],
    },
  },
  {
    id: "f2",
    category: "Fashion",
    name: "Women's Handbag",
    brand: "Elegance",
    price: 75,
    image: "./src/images/womens_handbag.jpg",
    description: "Elegant and spacious handbag perfect for daily outings.",
    variations: {
      colors: ["Brown", "Black"],
    },
  },
  {
    id: "f3",
    category: "Fashion",
    name: "Running Shoes",
    brand: "FootMove",
    price: 49,
    image: "./src/images/running_shoes.jpg",
    description: "Lightweight running shoes designed for comfort and performance.",
    variations: {
      sizes: [39, 40, 41, 42, 43],
      colors: ["Black", "White"],
    },
  },

  // 🏠 Home
  {
    id: "h1",
    category: "Home",
    name: "Air Fryer",
    brand: "KitchenKing",
    price: 99,
    image: "./src/images/air_fryer.jpg",
    description: "Compact air fryer that lets you enjoy fried food with less oil.",
    variations: {
      capacity: ["3L", "5L"],
    },
  },
  {
    id: "h2",
    category: "Home",
    name: "Vacuum Cleaner",
    brand: "CleanUp",
    price: 149,
    image: "./src/images/vaccum_cleaner.jpg",
    description: "Powerful vacuum cleaner with multiple attachments for deep cleaning.",
    variations: {
      power: ["1200W", "1600W"],
    },
  },
  {
    id: "h3",
    category: "Home",
    name: "LED Table Lamp",
    brand: "BrightLite",
    price: 29,
    image: "./src/images/led_table_lamp.jpg",
    description: "Stylish LED table lamp with adjustable brightness and color modes.",
    variations: {
      colors: ["White", "Black"],
    },
  },

  // 📚 Books
  // {
  //   id: "b1",
  //   category: "Books",
  //   name: "The Art of Coding",
  //   author: "Jane Dev",
  //   price: 29,
  //   image: "./src/images/laptop.jpg",
  //   description: "A deep dive into the principles and philosophy of clean code.",
  // },
  // {
  //   id: "b2",
  //   category: "Books",
  //   name: "JavaScript for Beginners",
  //   author: "John Script",
  //   price: 19,
  //   image: "./src/images/laptop.jpg",
  //   description: "Step-by-step guide to learning JavaScript from scratch.",
  // },
  // {
  //   id: "b3",
  //   category: "Books",
  //   name: "CSS Secrets",
  //   author: "Lea Verou",
  //   price: 39,
  //   image: "./src/images/laptop.jpg",
  //   description: "Tips and tricks to master advanced CSS techniques and layouts.",
  // },
];

export { products };
