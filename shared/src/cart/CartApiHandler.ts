import { Cart } from '../types';

export const fetchOrdersOfCart = async (id: string) => {
  const response = await fetch(`https://dummyjson.com/carts/${id}`);
  const cart = (await response.json()) as Cart;
  return cart.products;
};

export default class CartApiHandler {
  async fetchOrdersOfCart(id: string) {
    const response = await fetch(`https://dummyjson.com/carts/${id}`);
    const cart = (await response.json()) as Cart;
    return cart.products;
  }
}
