import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, Product, UserCart } from 'shared';

const initialState: UserCart = {
  items: [],

  initialized: false,

  loading: false,
};

const isProductExistInCart = (products: CartItem[], product: Product) =>
  products.find((item) => item.product.id === product.id) != null;

export const cartOrderSlice = createSlice({
  name: 'UserOrder',
  initialState: initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<CartItem>) => {
      if (isProductExistInCart(state.items, action.payload.product)) return;
      return { ...state, items: [...state.items, action.payload] };
    },

    loadingCartOrders: (state) => ({ ...state, loading: true }),

    initializeOrders: (_, action: PayloadAction<CartItem[]>) => ({
      loading: false,
      items: action.payload,
      initialized: true,
    }),

    updateOrder: (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex(
        (order) => order.product.id === action.payload.product.id
      );

      state.items[index] = action.payload;
      return state;
    },

    removeOrder: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.payload.id
        ),
      };
    },
  },
});
