import { Table } from "lucide-react";
import { z } from "zod";

// Basic product type

export type ProductType = {
  id: string;
  name: string;
  slug: string;
  image: string;
  stock: number;
  originalPrice: number;
};

export type TableProduct = {
  name: string;
  image: string;
  id: string;
  slug: string;
  createdAt: Date;
  category: string;
};
export type CarouselProduct = {
  name: string;
  image: string;
  id: string;
  slug: string;
  isCarousel: boolean;
  createdAt: Date;
  description: string;
};
export type NewArrivalsProduct = {
  name: string;
  image: string;
  id: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  isNew: boolean;
  slug: string;
  createdAt: Date;
  description: string;
};

// Zod schema for product validation
export const productSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(100, "Name must be less than 100 characters"),
    slug: z.string(),
    images: z.array(z.string()).optional().nullable(),
    originalPrice: z
      .number()
      .min(0.01, "Original price must be greater than 0"),
    discountPrice: z.number().min(0, "Discount price must be 0 or greater"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters"),
    image: z.string().optional().nullable(),
    categoryId: z.string().min(1, "Please select a category"),

    isNew: z.boolean(),
    isCarousel: z.boolean(),
    stock: z
      .number()
      .min(0, "Stock must be 0 or greater")
      .int("Stock must be a whole number"),
  })
  .refine(
    (data) => {
      if (data.discountPrice > 0 && data.discountPrice >= data.originalPrice) {
        return false;
      }
      return true;
    },
    {
      message: "Discount price must be less than original price",
      path: ["discountPrice"],
    }
  );

export type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  slug: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  description: string;
  image: string;
  images: string[];
  category: string;
  isNew: boolean;
  isCarousel: boolean;
  stock: number;
}
