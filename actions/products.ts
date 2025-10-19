"use server";

import { ProductFormData } from "@/types/products.schema";
import { prisma } from "@/prisma/db";

export async function createProduct(data: ProductFormData) {
  try {
    //Check for unique values
    const existingProduct = await prisma.product.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingProduct) {
      return {
        success: false,
        error: `The product (${data.name}) already exists`,
        data: null,
      };
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });
    if (!categoryExists) {
      return {
        success: false,
        error: `Category with ID ${data.categoryId} does not exist`,
        data: null,
      };
    }
    const dPercentage =
      data.discountPrice > 0
        ? ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
        : 0;

    const res = await prisma.product.create({
      data: {
        categoryId: data.categoryId,
        description: data.description,
        discountPercentage: dPercentage,
        discountPrice: data.discountPrice,
        image: data.image || "",
        images: data.images ?? [],
        isNew: data.isNew,
        isCarousel: data.isCarousel,
        name: data.name,
        slug: data.slug,
        originalPrice: data.originalPrice,
        stock: data.stock,
      },
    });
    return {
      success: true,
      error: null,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong! Please try again",
      data: null,
    };
  }
}
