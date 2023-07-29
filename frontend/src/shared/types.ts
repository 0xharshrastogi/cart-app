export interface Credentials {
  email: string;

  password: string;
}

export interface User extends Credentials {
  firstName: string;

  lastName: string;
}

export interface UserWithId extends User {
  id: string;
}

export interface IAuthApiService {
  signup(user: User): Promise<{
    user: UserWithId;
    token: string;
  }>;

  login(credential: Credentials): Promise<{
    user: UserWithId;
    token: string;
  }>;
}

export interface Product {
  id: string;

  title: string;

  price: string;

  thumbnail: string;

  description: string;
}

export interface ICartApiService {
  getAllShoppingProduct(): Promise<Product[]>;

  getUserCartProducts(userId: string): Promise<{
    id: string;
    products: {
      product: Product;
      quantity: number;
    }[];
  }>;

  insertProductToCart(arg: {
    cartId: string;
    productId: string;
  }): Promise<void>;

  removeProductFromCart(arg: {
    cartId: string;
    productId: string;
  }): Promise<void>;

  updateQuantity(
    cartId: string,
    productInfo: {
      product: Product;
      quantity: number;
    }
  ): Promise<void>;
}
