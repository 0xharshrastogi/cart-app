"use client";

import { PrivateComponentWrapper } from "@/components/PrivateComponentWrapper";
import CartProductItem from "@/container/CartProductItem/CartProductItem";
import CartSection from "@/container/CartSection/CartSection";
import Navbar from "@/container/Navbar/Navbar";
import { useUserCart } from "@/hooks/useUserCart";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Product } from "shared";
import "./CartPage.scss";

const CartPage = () => {
  const userCartOrders = useUserCart();

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
      (total, { product: product, quantity }) =>
        total + parseInt(product.price) * quantity,
      0
    );
  }, [userCartOrders.orders]);

  const TAX_PERCENTAGE = 12;

  const taxAmount = (TAX_PERCENTAGE / 100) * totalCost;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="cart-container px-10 mt-4">
        <CartSection title="Orders">
          <div className="space-y-2">
            {userCartOrders.orders.length === 0 ? (
              <div>
                <p>
                  No order are selected, Go to{" "}
                  <Link className="font-bold link link-primary" href="/shop">
                    Shop
                  </Link>
                </p>
              </div>
            ) : (
              userCartOrders.orders.map((item) => (
                <CartProductItem
                  key={item.product.id}
                  product={item.product}
                  initialQuantity={item.quantity}
                  onCancel={() => onCancelHandler(item.product)}
                  onDebouncedQuantityChange={(quantity) =>
                    onQuantityChangeHandler(item.product, quantity)
                  }
                />
              ))
            )}
          </div>
        </CartSection>
        <CartSection title="Payment Summery">
          <div className="summery-item order-summery">
            <span>Order Summery</span>
            <span>
              <span className="dollar font-semibold">$</span> {totalCost}
            </span>
          </div>

          <div className="summery-item order-summery">
            <span>Tax ({TAX_PERCENTAGE}%)</span>
            <span>
              <span className="dollar font-semibold">$</span> {taxAmount}
            </span>
          </div>

          <div className="summery-item order-summery">
            <span>Total</span>
            <span>
              <span className="dollar font-semibold">$</span>{" "}
              {taxAmount + totalCost}
            </span>
          </div>
        </CartSection>
      </main>
    </div>
  );
};

export default function CartPrivatePage() {
  return (
    <PrivateComponentWrapper redirectTo="/account/login">
      <CartPage />
    </PrivateComponentWrapper>
  );
}
