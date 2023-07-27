"use client";

import Navbar from "@/container/Navbar/Navbar";
import { ShoppingItem } from "@/container/ShoopingItem/ShoppingItem";
import { useUserCart } from "@/hooks/useUserCart";
import { useEffect, useState } from "react";
import { Product } from "shared";
import "./ShopPage.scss";

const fetchShopProduct = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = (await response.json()) as { products: Product[] };
  return data.products;
};

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const cart = useUserCart("1");

  useEffect(() => {
    if (cart.loadedFromServer || cart.loading) return;
    cart.initializeOrders();
  }, [cart]);

  useEffect(() => {
    fetchShopProduct().then((products) => setProducts(products));
  }, []);

  const onBuyHandler = (product: Product) => {
    cart.insert(product, 1);
  };

  return (
    <>
      <Navbar />
      <main className="shopping-items-container">
        {products?.map((product) => (
          <ShoppingItem
            key={product.id}
            product={product}
            isAdded={
              cart.orders.find((item) => item.product.id === product.id) != null
            }
            onBuy={() => onBuyHandler(product)}
          />
        ))}
      </main>
    </>
  );
};

export default ShopPage;
