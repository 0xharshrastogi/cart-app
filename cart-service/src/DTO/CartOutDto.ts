import { Types } from 'mongoose';
import { ICart } from '../models/userCart';

export class CartOutDTO<T extends ICart & { _id: Types.ObjectId }> {
  constructor(private readonly value: T) {}

  toJSON() {
    return {
      id: this.value._id,
      products: this.value.products.map((product: any) => ({
        product: {
          id: product.productId._id,
          title: product.productId.title,
          description: product.productId.description,
          price: product.productId.price,
        },
        quantity: product.quantity,
      })),
    };
  }
}
