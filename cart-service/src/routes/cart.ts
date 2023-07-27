import debug from 'debug';
import express from 'express';
import { isValidObjectId } from 'mongoose';
import { Product } from '../models/product';
import {
  Cart,
  insertProductInCart,
  isProductInCart,
  removeProductInCart,
} from '../models/userCart';

const cartLog = debug('cart::log');

export const cartRouter = express.Router();

cartRouter.get('/cart', async (request, response) => {
  if (!('userId' in request.query)) {
    response.status(400).json({
      error: 'expected a "userId" in query params',
    });
    return;
  }

  let userId = request.query['userId'];

  const cartItem = await Cart.findOne({ userId }).populate('products');

  if (cartItem == null) {
    response.status(404).json({
      error: 'user not found',
      message: 'User not found with id ' + userId,
    });
    return;
  }

  response.json({ name: 'Harsh' });
});

cartRouter.post('/cart', async (request, response) => {
  const { userId } = request.body as { userId: string };
  await Cart.create({ userId, products: [] });
  response.send();
});

cartRouter.post(
  '/cart/:cardId/update/:action/:productId',
  async (request, response) => {
    const { cardId, productId, action } = request.params;

    if (!isValidObjectId(productId) || !isValidObjectId(cardId)) {
      response.status(400).json({ error: 'Invalid product or card id' });
      return;
    }

    if (!['add', 'remove'].includes(action)) {
      response.status(400).json({ error: 'invalid action ' + action });
      return;
    }

    const cart = await Cart.findById(cardId);
    if (cart == null) {
      response.status(404).json({
        error: 'cart not found',
        message: 'Cart not found into records',
      });
      return;
    }

    if (!isValidObjectId(productId))
      response.status(400).json({ error: 'Invalid ID' });
    const product = await Product.findById(productId);
    if (product == null) {
      response.status(404).json({
        error: 'product not found',
        message: 'Product not found into records',
      });
      return;
    }

    if (action === 'add') {
      if (isProductInCart(cart, product)) {
        cartLog('failed to add: product is in cart');
        response.status(400).json({ error: 'product already exist in cart' });
        return;
      }
      await insertProductInCart(cart, product);
      cartLog('success to insert product');
    }

    if (action === 'remove') {
      if (!isProductInCart(cart, product)) {
        cartLog('failed to remove: product is not in cart');
        response.status(400).json({ error: 'product is not in cart' });
        return;
      }
      await removeProductInCart(cart, product);
      cartLog('success to remove product');
    }
    response.send();
  }
);
