"use server";

import { prisma } from "@/prisma/db";
import { TableCategory } from "@/types/categories.schema";
import { NavCategory } from "@/types/categories.schema";

export async function getCategories(): Promise<TableCategory[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        products: true,
      },
    });
    const manipulatedCategories = categories.map((category) => {
      return {
        name: category.name,
        id: category.id,
        slug: category.slug,
        createdAt: category.createdAt,
        productsCount: category.products.length,
      };
    });
    return manipulatedCategories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getNavCategories(): Promise<NavCategory[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        slug: true,
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<NavCategory | null> {
  try {
    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
      select: {
        name: true,
        slug: true,
      },
    });

    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
}
