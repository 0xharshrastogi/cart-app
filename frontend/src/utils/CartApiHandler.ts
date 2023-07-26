import { Cart, ICartHandler, Product } from 'shared';

export class CartApiHandler implements ICartHandler {
  async fetchOrderOfCart(id: string): Promise<Product[]> {
    const response = await fetch(`https://dummyjson.com/carts/${id}`);
    const cart = (await response.json()) as Cart;
    return cart.products;
  }
}
