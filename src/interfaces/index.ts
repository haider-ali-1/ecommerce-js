interface Product {
  id: string;
  category: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  // author?: string;
  description: string;
  variations: Record<string, string[] | number[]>;
}

interface CartItem extends Product {
  quantity: number;
}

export type { Product, CartItem };
