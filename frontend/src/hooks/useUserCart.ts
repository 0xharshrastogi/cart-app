import { CartApiService } from '@/helper/CartApiService';
import { cartOrderSlice } from '@/redux/cart/cartSlice';
import { CartItem, Product } from 'shared';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

const cartApiService = CartApiService.create();

export const useUserCart = () => {
  const userOrders = useAppSelector((state) => state.UserOrder);
  const userId = useAppSelector((state) => {
    const { user } = state.User;
    return user.isLoggedIn ? user.info.id : null;
  });
  const dispatch = useAppDispatch();

  const { id: cartId } = userOrders;

  const initializeOrders = async () => {
    if (!userId) throw new Error('cannot load user data without user id');
    dispatch(cartOrderSlice.actions.loadingCartOrders());
    const cart = await cartApiService.getUserCartProducts(userId);
    dispatch(cartOrderSlice.actions.initializeOrders(cart));
  };

  const updateOrder = (item: CartItem) => {
    dispatch(cartOrderSlice.actions.updateOrder(item));
  };

  const updateQuantityOfProduct = async (
    product: Product,
    quantity: number
  ) => {
    await cartApiService.updateQuantity(cartId, { product, quantity });
    updateOrder({ product: product, quantity });
  };

  const remove = async (product: Product) => {
    const { id: productId } = product;
    await cartApiService.removeProductFromCart({
      cartId,
      productId,
    });
    dispatch(cartOrderSlice.actions.removeOrder(product));
  };

  const insert = async (product: Product, quantity: number) => {
    await cartApiService.insertProductToCart({ cartId, productId: product.id });
    dispatch(cartOrderSlice.actions.addOrder({ product: product, quantity }));
  };

  return {
    orders: userOrders.items,
    loadedFromServer: userOrders.initialized,
    initializeOrders,
    loading: userOrders.loading,
    updateQuantityOfProduct,
    updateOrder,
    remove,
    insert,
    id: userOrders.id,
  };
};
