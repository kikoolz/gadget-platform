import { z } from "zod";

export const CategoryBaseSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Category title is required"),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateCategorySchema = CategoryBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CategoryTableSchema = CategoryBaseSchema.omit({
  updatedAt: true,
}).extend({
  productsCount: z.number(),
});

export const NavCategorySchema = CategoryBaseSchema.omit({
  updatedAt: true,
  id: true,
  createdAt: true,
});

export type TableCategory = z.infer<typeof CategoryTableSchema>;
export type NavCategory = z.infer<typeof NavCategorySchema>;
export type CategoryFormData = z.infer<typeof CreateCategorySchema>;
