import { z } from "zod";

export const CategoryBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
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

export type TableCategory = z.infer<typeof CategoryTableSchema>;
export type CategoryFormData = z.infer<typeof CreateCategorySchema>;
