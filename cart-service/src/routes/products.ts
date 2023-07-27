import { Router } from 'express';
import { Product } from '../models/product';

export const productRouter = Router();

productRouter.get('/product', async (_, response) => {
  const products = await Product.find();
  response.json({ products });
});

productRouter.post('/product', async (request, response) => {
  const product = await Product.create(request.body);
  response.json({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  });
});
