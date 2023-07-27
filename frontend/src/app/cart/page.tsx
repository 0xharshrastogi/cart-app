"use client";

import CartProductItem from "@/container/CartProductItem/CartProductItem";
import CartSection from "@/container/CartSection/CartSection";
import Navbar from "@/container/Navbar/Navbar";
import { useUserCart } from "@/hooks/useUserCart";
import { useEffect, useMemo } from "react";
import { Product } from "shared";
import "./CartPage.scss";

const CartPage = () => {
  const userCartOrders = useUserCart("1");

  useEffect(() => {
    if (userCartOrders.loadedFromServer || userCartOrders.loading) return;
    userCartOrders.initializeOrders();
  }, [userCartOrders]);

  const onQuantityChangeHandler = (product: Product, quantity: number) => {
    userCartOrders.updateQuantityOfProduct(product, quantity);
  };

  const onCancelHandler = (product: Product) => userCartOrders.remove(product);

  const totalCost = useMemo(() => {
    return userCartOrders.orders.reduce(
      (total, { product, quantity }) => total + product.price * quantity,
      0
    );
  }, [userCartOrders.orders]);

  const ADDITIONAL_COST = 10;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="cart-container px-10 mt-4">
        <CartSection title="Orders">
          <div className="space-y-2">
            {userCartOrders.orders.map((item) => (
              <CartProductItem
                key={item.product.id}
                product={item.product}
                initialQuantity={item.quantity}
                onCancel={() => onCancelHandler(item.product)}
                onDebouncedQuantityChange={(quantity) =>
                  onQuantityChangeHandler(item.product, quantity)
                }
              />
            ))}
          </div>
        </CartSection>
        <CartSection title="Payment Summery">
          <div className="summery-item order-summery">
            <span>Order Summery</span>
            <span>$ {totalCost}</span>
          </div>

          <div className="summery-item order-summery">
            <span>Additional Cost</span>
            <span>$ {ADDITIONAL_COST}</span>
          </div>

          <div className="summery-item order-summery">
            <span>Total Cost</span>
            <span>$ {ADDITIONAL_COST + totalCost}</span>
          </div>
        </CartSection>
      </main>
    </div>
  );
};

export default CartPage;
