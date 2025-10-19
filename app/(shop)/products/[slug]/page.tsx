import { notFound } from "next/navigation";
import { getProductBySlug } from "@/queries/products";
import ProductDetail from "@/components/shop/ProductDetails";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Product({ params }: ProductPageProps) {
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}