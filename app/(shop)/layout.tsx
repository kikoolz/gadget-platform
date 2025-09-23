import ShopHeader from "@/components/shop/ShopHeader";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ShopHeader />
      {children}
    </div>
  );
}
