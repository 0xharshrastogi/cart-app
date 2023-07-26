import { Cart } from './src/types';

// export * from './src/cart/CartApiHandler';
export * from './src/types';

export const fetchOrdersOfCart = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/carts/${id}`);
  const cart = (await response.json()) as Cart;
  return cart.products;
};
