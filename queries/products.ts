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
        createdAt: true,
      },
      where: {
        isCarousel: true,
      },
    });

    const manipulatedProducts = products.map((prod) => {
      return {
        name: prod.name,
        image: prod.image ?? "",
        id: prod.id,
        slug: prod.slug,
        createdAt: prod.createdAt,
        description: prod.description,
        isCarousel: true,
      };
    });
    return manipulatedProducts;
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
        createdAt: true,
      },
      where: {
        isNew: true,
      },
    });

    const manipulatedProducts = products.map((prod) => {
      return {
        name: prod.name,
        image: prod.image ?? "",
        id: prod.id,
        price: prod.originalPrice,
        discountPrice: prod.discountPrice,
        discountPercentage: prod.discountPercentage,
        isNew: true,
        slug: prod.slug,
        createdAt: prod.createdAt,
        description: prod.description,
      };
    });
    return manipulatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return null;
    }

    // Transform the product data to match the expected structure
    return {
      id: product.id,
      title: product.name,
      images:
        product.images.length > 0
          ? product.images
          : [product.image || "/placeholder.svg"],
      merchantSku: product.name.toLowerCase().replace(/\s+/g, "-"),
      sku: product.slug.toUpperCase(),
      currentPrice: product.discountPrice || product.originalPrice,
      originalPrice: product.originalPrice,
      discountPercentage: product.discountPercentage,
      description: product.description,
      specifications: {
        Brand: "Generic", // You might want to add this to your schema
        Stock: product.stock.toString(),
        Category: product.category.name,
      },
      seller: {
        name: "Gadget Platform",
        rating: 4.8,
        link: "/sellers/gadget-platform",
      },
      returnPolicy: "This item is eligible for free returns within 30 days.",
      inStock: product.stock > 0,
      slug: product.slug,
      stock: product.stock,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTrendingProducts(): Promise<NewArrivalsProduct[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20, // Limit to 20 products
      select: {
        id: true,
        image: true,
        name: true,
        slug: true,
        description: true,
        originalPrice: true,
        discountPercentage: true,
        discountPrice: true,
        createdAt: true,
      },
    });

    const manipulatedProducts = products.map((prod) => {
      return {
        name: prod.name,
        image: prod.image ?? "/placeholder.svg",
        id: prod.id,
        price: prod.originalPrice,
        discountPrice: prod.discountPrice,
        discountPercentage: prod.discountPercentage,
        isNew: false,
        slug: prod.slug,
        createdAt: prod.createdAt,
        description: prod.description,
      };
    });
    return manipulatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<NewArrivalsProduct[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
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
        createdAt: true,
      },
    });

    const manipulatedProducts = products.map((prod) => {
      return {
        name: prod.name,
        image: prod.image ?? "",
        id: prod.id,
        price: prod.originalPrice,
        discountPrice: prod.discountPrice,
        discountPercentage: prod.discountPercentage,
        isNew: false, // Category products are not necessarily new
        slug: prod.slug,
        createdAt: prod.createdAt,
        description: prod.description,
      };
    });
    return manipulatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
