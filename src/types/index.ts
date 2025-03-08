export interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: IRating;
}

export interface ICartItem extends IProduct {
  quantity: number;
}
