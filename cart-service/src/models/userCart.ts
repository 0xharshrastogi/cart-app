import { Document, Schema, Types, model } from 'mongoose';
import { ProductWithId as ProductInstance } from './product';

interface ICartItem {
  productId: string;
  quantity: number;
}

export interface ICart extends Document {
  userId: string;
  products: ICartItem[];
}

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema<ICart>({
  userId: { type: String, required: true },
  products: [cartItemSchema],
});

export const Cart = model<ICart>('Cart', cartSchema);

export type CartInstance = Document<unknown, {}, ICart> &
  ICart & {
    _id: Types.ObjectId;
  };

export const findProductInCart = (cart: CartInstance, productId: string) =>
  cart.products.find((item) => item.productId.toString() === productId);

export const isProductInCart = (cart: CartInstance, product: ProductInstance) =>
  findProductInCart(cart, product.id) != null;

export const insertProductInCart = async (
  cart: CartInstance,
  product: ProductInstance
) => {
  cart.products.push({ productId: product.id, quantity: 1 });
  await cart.save();
};

export const removeProductInCart = async (
  cart: CartInstance,
  product: ProductInstance
) => {
  cart.products = cart.products.filter(
    (item) => item.productId.toString() !== product.id
  );
  await cart.save();
};
