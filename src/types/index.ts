type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type Cart = {
  id: string;
  quantity: number;
};

export type { User, Cart };
