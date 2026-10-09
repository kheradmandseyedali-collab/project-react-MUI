import { request } from "@/api/client";
import type { Product } from "@/types";
export const productService = {
  all: async () =>
    (await request<{ products: Product[] }>("/products?limit=100")).products,
  categories: () => request<string[]>("/products/category-list"),
};