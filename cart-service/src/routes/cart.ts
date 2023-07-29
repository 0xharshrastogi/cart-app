import debug from 'debug';
import express from 'express';
import { isValidObjectId } from 'mongoose';
import { CartOutDTO } from '../DTO/CartOutDto';
import { RabbitMqHandler } from '../messanger/setupRabbitMq';
import { Product } from '../models/product';
import {
  Cart,
  findProductInCart,
  insertProductInCart,
  isProductInCart,
  removeProductInCart,
} from '../models/userCart';

const cartLog = debug('cart::log');

export const cartRouter = express.Router();

const rabbitMqHandler = new RabbitMqHandler('amqp://localhost');

rabbitMqHandler.consume<{ userId: string }>(
  'create-cart',
  async ({ userId }) => {
    const cart = await Cart.create({ userId, products: [] });
    console.log(cart);

    rabbitMqHandler.publish('cart-created', {
      cardId: cart.id,
    });
  }
);

cartRouter.get('/cart', async (request, response) => {
  try {
    if (!('userId' in request.query)) {
      response.status(400).json({
        error: 'expected a "userId" in query params',
      });
      return;
    }

    let userId = request.query['userId'];

    const cartItem = await Cart.findOne({ userId }).populate(
      'products.productId'
    );

    if (cartItem == null) {
      response.status(404).json({
        error: 'user not found',
        message: 'User not found with id ' + userId,
      });
      return;
    }

    response.json(new CartOutDTO(cartItem));
  } catch (error) {
    response.status(500).json({
      message: 'failed to fetch user carts',
      error: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
});

cartRouter.post('/cart', async (request, response) => {
  const { userId } = request.body as { userId: string };
  await Cart.create({ userId, products: [] });
  response.send();
});

cartRouter.post(
  '/cart/:cartId/update/:action/:productId',
  async (request, response) => {
    const { cartId, productId, action } = request.params;

    if (!isValidObjectId(productId) || !isValidObjectId(cartId)) {
      response.status(400).json({ error: 'Invalid product or card id' });
      return;
    }

    if (!['add', 'remove', 'quantity'].includes(action)) {
      response.status(400).json({ error: 'invalid action ' + action });
      return;
    }

    const quantity = request.query['quantity'] ?? null;
    if (action === 'quantity' && !quantity) {
      cartLog('quantity query not present in url');
      response.status(400).json({
        error: `expected 'quantity' as unsigned integer value in query params`,
      });
      return;
    }

    const [cart, product] = await Promise.all([
      Cart.findById(cartId),
      Product.findById(productId),
    ]);

    if (cart == null || product == null) {
      const item = cart == null ? 'cart' : 'product';
      response.status(404).json({
        error: `${item}not found`,
        message: `${item} not found into records`,
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

    if (action === 'quantity') {
      const product = findProductInCart(cart, productId);
      if (!product) {
        cartLog('failed to remove: product is not in cart');
        response.status(400).json({ error: 'product is not in cart' });
        return;
      }
      product.quantity = parseInt(quantity as string);
      await cart.save();
    }
    response.send();
  }
);
