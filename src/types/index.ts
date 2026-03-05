export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string; _id: string };
  brand?: { name: string };
  description?: string;
  images?: string[];
  quantity?: number;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}
