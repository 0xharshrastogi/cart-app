import { Router } from 'express';
import { Product } from '../models/product';
import { mapProductOut } from '../utils';

export const productRouter = Router();

productRouter.get('/product', async (_, response) => {
  const products = await Product.find();
  response.json(mapProductOut(products));
});

productRouter.post('/product', async (request, response) => {
  const product = await Product.create(request.body);
  response.json(mapProductOut(product));
});
