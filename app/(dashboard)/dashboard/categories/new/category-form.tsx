"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Label } from "@/components/ui/label";

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

import { Sparkles } from "lucide-react";
import {
  CategoryFormData,
  CreateCategorySchema,
} from "@/types/categories.schema";

export default function categoryForm() {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const calculateDiscountPercentage = (
    original: number,
    discount: number | undefined
  ): number => {
    if (!discount || discount >= original) return 0;
    return Math.round(((original - discount) / original) * 100);
  };

  const onSubmit: SubmitHandler<CategoryFormData> = (
    data: CategoryFormData
  ) => {
    console.log(data);
  };

  const onCancel = (): void => {
    form.reset();
    // setGeneratedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto ">
        <div className="grid max-w-2xl mx-auto gap-8">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="py-3 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 ">
                <Sparkles className="h-5 w-5" />
                Category Form
              </CardTitle>
              <CardDescription className="">
                Fill in the information below to create your category
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Category Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">
                          Category Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter category name..."
                            className="border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="submit" className="">
                      Create Category
                    </Button>

                    <Button
                      type="button"
                      onClick={onCancel}
                      variant="outline"
                      className=""
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
