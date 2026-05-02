import { ProductsType } from "./Product.type";

export interface CartResType {
  cartId: string;
  message: string;
  status: string;
  numOfCartItems: number;
  data: {
    totalCartPrice: number;
    products: [];
  };
}

export interface CartItemType {
  count: number;
  price: number;
  product: ProductsType;
}
