import { cartOrderSlice } from '@/redux/cart/cartSlice';
import { Cart, CartItem, Product } from 'shared';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useUserCart = (userId: string) => {
  const userOrders = useAppSelector((state) => state.UserOrder);
  const dispatch = useAppDispatch();

  const initializeOrders = async () => {
    dispatch(cartOrderSlice.actions.loadingCartOrders());
    const response = await fetch(`https://dummyjson.com/carts/${userId}`);
    const cart = (await response.json()) as Cart;
    const cartItems = cart.products.map((product) => ({
      product,
      quantity: 1,
    }));

    dispatch(cartOrderSlice.actions.initializeOrders(cartItems));
  };

  const updateOrder = (item: CartItem) => {
    dispatch(cartOrderSlice.actions.updateOrder(item));
  };

  const updateQuantityOfProduct = (product: Product, quantity: number) => {
    updateOrder({ product, quantity });
  };

  const remove = (product: Product) =>
    dispatch(cartOrderSlice.actions.removeOrder(product));

  const removeProduct = (product: Product) => {};

  return {
    orders: userOrders.items,
    loadedFromServer: userOrders.initialized,
    initializeOrders,
    loading: userOrders.loading,
    updateQuantityOfProduct,
    updateOrder,
    remove,
  };
};
