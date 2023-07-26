import { useMemo } from 'react';
import { Cart, Product } from 'shared';

export const useCartUtil = () => {
  const fetchOrderOfCart = async (id: string): Promise<Product[]> => {
    const response = await fetch(`https://dummyjson.com/carts/${id}`);
    const cart = (await response.json()) as Cart;
    return cart.products;
  };

  return useMemo(
    () => ({
      fetchOrderOfCart,
    }),
    []
  );
};
