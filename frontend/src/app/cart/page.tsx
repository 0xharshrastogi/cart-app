"use client";

import CartProductItem from "@/container/CartProductItem/CartProductItem";
import CartSection from "@/container/CartSection/CartSection";
import Navbar from "@/container/Navbar";
import { useUserCart } from "@/hooks/useUserCart";
import { useEffect } from "react";
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
                onQuantityChange={(quantity) =>
                  onQuantityChangeHandler(item.product, quantity)
                }
              />
            ))}
          </div>
        </CartSection>
        <CartSection title="Payment Summery"></CartSection>
      </main>
    </div>
  );
};

export default CartPage;
