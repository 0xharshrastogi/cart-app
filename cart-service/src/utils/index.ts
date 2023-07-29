import { ProductWithId as ProductInstance } from '../models/product';

export const mapProductOut = (
  products: ProductInstance | ProductInstance[]
) => {
  const mapper = (product: ProductInstance) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    description: product.description,
  });

  return Array.isArray(products) ? products.map(mapper) : mapper(products);
};
