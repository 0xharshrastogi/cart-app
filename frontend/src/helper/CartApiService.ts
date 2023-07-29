import { ICartApiService, Product } from '@/shared/types';
import axios, { AxiosInstance } from 'axios';

const ErrMsgSomethingWentWrong = 'Something went wrong';

export class CartApiService implements ICartApiService {
  private constructor(private readonly instance: AxiosInstance) {}

  async getAllShoppingProduct() {
    try {
      const response = await this.instance.get<Product[]>('/product');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserCartProducts(userId: string) {
    try {
      const response = await this.instance.get<{
        id: string;
        products: { product: Product; quantity: number }[];
      }>('cart', {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async insertProductToCart(arg: { cartId: string; productId: string }) {
    const { cartId, productId } = arg;
    await this.instance.post(`/cart/${cartId}/update/add/${productId}`);
  }

  async removeProductFromCart(arg: { cartId: string; productId: string }) {
    const { cartId, productId } = arg;
    await this.instance.post(`/cart/${cartId}/update/remove/${productId}`);
  }

  async updateQuantity(
    cartId: string,
    productInfo: { product: Product; quantity: number }
  ) {
    this.instance.post(
      `/cart/${cartId}/update/quantity/${productInfo.product.id}`,
      undefined,
      {
        params: { quantity: productInfo.quantity },
      }
    );
  }

  private handleError(error: unknown): never {
    if (!axios.isAxiosError(error)) throw new Error(ErrMsgSomethingWentWrong);
    const message = error.response?.data['message'] ?? ErrMsgSomethingWentWrong;
    throw new Error(message);
  }

  private static readonly instance = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  static create(): ICartApiService {
    return new CartApiService(CartApiService.instance);
  }
}
