import ShopHeader from "@/components/shop/ShopHeader";
import { CartProvider } from "@/contexts/CartContext";
import React from "react";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div>
        <ShopHeader />
        {children}
      </div>
    </CartProvider>
  );
}
