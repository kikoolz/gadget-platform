
import { ProductDetailProps } from "@/components/shop/ProductDetails";
import { prisma } from "@/prisma/db";
import { TableCategory } from "@/types/categories.schema";
import {
  CarouselProduct,
  NewArrivalsProduct,
  TableProduct,
} from "@/types/products.schema";

export async function getProducts(): Promise<TableProduct[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });
    const manipulatedProducts = products.map((prod) => {
      return {
        name: prod.name,
        image: prod.image ?? "",
        id: prod.id,
        slug: prod.slug,
        createdAt: prod.createdAt,
        category: prod.category.name,
      };
    });
    return manipulatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getHeroCarouselProducts(): Promise<CarouselProduct[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        image: true,
        name: true,
        slug: true,
        description: true,
      },
      where: {
        isCarousel: true,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getNewArrivals(): Promise<NewArrivalsProduct[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        image: true,
        name: true,
        slug: true,
        description: true,
        originalPrice: true,
        discountPercentage: true,
        discountPrice: true,
      },
      where: {
        isNew: true,
      },
    });

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getProductBySlug(
  slug: string
): Promise<ProductDetailProps | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        images: true,
        discountPrice: true,
        originalPrice: true,
        discountPercentage: true,
        description: true,
        stock: true,
      },
    });

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
