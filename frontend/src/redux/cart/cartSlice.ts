import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem, UserCart } from 'shared';

const initialState: UserCart = {
  items: [],

  initialized: false,

  loading: false,
};

export const cartOrderSlice = createSlice({
  name: 'UserOrder',
  initialState: initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<CartItem>) => {
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
  },
});
