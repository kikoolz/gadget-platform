"use server";
import { prisma } from "@/prisma/db";
import { CategoryFormData } from "@/types/categories.schema";

export async function createCategory(data: CategoryFormData) {
  try {
    console.log("RECEIVED DATA", data);

    //Check for unique values
    const existingCategory = await prisma.category.findUnique({
      where: {
        slug: data.slug,
      },
    });
    if (existingCategory) {
      return {
        success: false,
        error: `The category (${data.name}) already exists`,
        data: null,
      };
    }
    const res = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      },
    });
    console.log("CREATED RECORD", res);
    return {
      success: true,
      error: null,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong!) Please Try again",
      data: null,
    };
  }
}
