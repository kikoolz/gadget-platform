"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/types/products.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import MultipleImageInput from "@/components/re-usable/MultipleImageInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Tag, DollarSign, Image, Sparkles } from "lucide-react";
import { TableCategory } from "@/types/categories.schema";
import { generateSlug } from "@/lib/generateSlug";
import { createProduct } from "@/actions/products";
import { toast } from "sonner";
import SubmitButton from "@/components/re-usable/SubmitButton";
import { useRouter } from "next/dist/client/components/navigation";
import { decodeAction } from "next/dist/server/app-render/entry-base";

// const categories: string[] = [
//   "Accessories",
//   "Clothing",
//   "Electronics",
//   "Home & Garden",
//   "Sports & Outdoors",
//   "Beauty & Personal Care",
//   "Books & Media",
//   "Toys & Games",
// ];

export default function ProductForm({
  categories,
}: {
  categories: TableCategory[];
}) {
  const [productImages, setProductImages] = useState<string[]>([]);
  console.log(productImages);
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      originalPrice: 0,
      discountPrice: 0,
      description: "",
      image: "",
      categoryId: "",
      isNew: false,
      isCarousel: false,
      stock: 0,
      images: [],
    },
  });

  const [processing, setProcessing] = useState(false);

  const watchedOriginalPrice: number = form.watch("originalPrice");
  const watchedDiscountPrice: number = form.watch("discountPrice");

  const calculateDiscountPercentage = (
    original: number,
    discount: number
  ): number => {
    if (!discount || discount >= original || discount <= 0) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<ProductFormData> = async (
    data: ProductFormData
  ) => {
    console.log("submitted!", data);
    setProcessing(true);

    const product = {
      name: data.name,
      originalPrice: data.originalPrice,
      discountPrice:
        data.discountPrice > 0 ? data.discountPrice : data.originalPrice,
      description: data.description,
      image: productImages.length > 0 ? productImages[0] || "" : "",
      categoryId: data.categoryId,
      isNew: data.isNew,
      isCarousel: data.isCarousel,
      stock: data.stock,
      slug: generateSlug(data.name),
      images: productImages.length > 0 ? productImages : [],
    };

    const res = await createProduct(product);
    console.log(res);
    if (res.success) {
      toast.success("Product created successfully!");
      setProcessing(false);
      form.reset();
      router.push("/dashboard/products");
    } else {
      toast.error("Failed to create product: " + res.error);
      setProcessing(false);
    }
  };

  const onCancel = (): void => {
    form.reset();
    // setGeneratedProduct(null);
    router.push("/dashboard/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto ">
        <div className="grid max-w-2xl mx-auto gap-8">
          {/* Form Section */}
          <Card className="shadow border-0 backdrop-blur-sm">
            <CardHeader className="  rounded-t-lg">
              <CardTitle className="flex items-center gap-2 ">
                <Sparkles className="h-5 w-5" />
                Product Details
              </CardTitle>
              <CardDescription className="text-gray-500">
                Fill in the information below to create your product
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Product Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Product Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product name..."
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Pricing Section */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Original Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            Discount Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00 (optional)"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? parseFloat(e.target.value)
                                    : 0
                                )
                              }
                            />
                          </FormControl>
                          {watchedDiscountPrice > 0 &&
                            watchedOriginalPrice > 0 && (
                              <div className="text-sm text-green-600 font-medium">
                                {calculateDiscountPercentage(
                                  watchedOriginalPrice,
                                  watchedDiscountPrice
                                )}
                                % discount
                              </div>
                            )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product..."
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/500 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image URL */}
                  {/* <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold flex items-center gap-1">
                          <Image className="h-4 w-4" />
                          Image URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <div className="grid gap-3">
                    <div className="w-full mx-auto">
                      <MultipleImageInput
                        title="Product Images"
                        imageUrls={productImages}
                        setImageUrls={setProductImages}
                        endpoint="productImages"
                      />
                    </div>
                  </div>

                  {/* Category and Rating */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Stock and New Badge */}
                  <div className="grid md:grid-cols-3 gap-5">
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Stock Quantity
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isNew"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel className="text-gray-700 font-semibold">
                            New Product
                          </FormLabel>
                          <div className="flex items-center space-x-2 h-10">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <Label className="text-sm text-gray-600">
                              {field.value ? "Yes" : "No"}
                            </Label>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isCarousel"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel className="text-gray-700 font-semibold">
                            Carousel Product
                          </FormLabel>
                          <div className="flex items-center space-x-2 h-10">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <Label className="text-sm text-gray-600">
                              {field.value ? "Yes" : "No"}
                            </Label>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-4">
                    <SubmitButton
                      title="Create Product"
                      loadingTitle="Creating..."
                      isLoading={processing}
                    />

                    <Button
                      type="button"
                      onClick={onCancel}
                      variant="outline"
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
