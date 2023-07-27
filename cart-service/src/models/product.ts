import { Document, ObjectId, Schema, model } from 'mongoose';

export interface Product extends Document {
  title: string;
  price: string;
  thumbnail: string;
}

export type ProductWithId = Document<unknown, {}, Product> &
  Product & {
    _id: ObjectId;
  };

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  price: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

export const Product = model<Product>('Products', productSchema);
