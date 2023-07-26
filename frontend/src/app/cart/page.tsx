"use client";

import CartProductItem from "@/container/CartProductItem/CartProductItem";
import CartSection from "@/container/CartSection/CartSection";
import Navbar from "@/container/Navbar";
import { useCartUtil } from "@/hooks/useCartUtils";
import { useEffect, useState } from "react";
import { Product } from "shared";
import "./CartPage.scss";

const CartPage = () => {
  const [orders, setOrders] = useState<Product[]>([]);
  const cartUtil = useCartUtil();
  useEffect(() => {
    cartUtil.fetchOrderOfCart("1").then((orders) => {
      setOrders(orders);
      console.log(orders);
    });
  }, [cartUtil]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <main className="cart-container px-10 mt-4">
        <CartSection title="Orders">
          <div className="space-y-2">
            {orders.map((item) => (
              <CartProductItem key={item.id} product={item} />
            ))}
          </div>
        </CartSection>
        <CartSection title="Payment Summery"></CartSection>
      </main>
    </div>
  );
};

export default CartPage;
