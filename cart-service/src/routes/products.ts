import { Router } from 'express';
import { Product, ProductWithId as ProductInstance } from '../models/product';

export const productRouter = Router();

const mapProductOut = (products: ProductInstance | ProductInstance[]) => {
  const mapper = (product: ProductInstance) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  });

  return Array.isArray(products) ? products.map(mapper) : mapper(products);
};

productRouter.get('/product', async (_, response) => {
  const products = await Product.find();
  response.json(mapProductOut(products));
});

productRouter.post('/product', async (request, response) => {
  const product = await Product.create(request.body);
  response.json(mapProductOut(product));
});
