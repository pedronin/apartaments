import allProducts from "@/public/products.json";

import type { IFilters, IProduct, ISort } from "@/types";

// Имитация "бэкенда"
export const fetchProductsFromServer = async (
  filters: IFilters,
  sort: ISort | null,
  page: number,
  pageSize: number
) => {
  // эмуляция задержки
  await new Promise((resolve) => setTimeout(resolve, 500));

  let products = [...allProducts] as IProduct[];

  if (filters.price) {
    products = products.filter(
      (p) => p.price >= filters.price![0] && p.price <= filters.price![1]
    );
  }
  if (filters.area) {
    products = products.filter(
      (p) => p.area >= filters.area![0] && p.area <= filters.area![1]
    );
  }
  if (filters.rooms !== null) {
    products = products.filter((p) => p.rooms === filters.rooms);
  }

  if (sort) {
    products.sort((a, b) => {
      const field = sort.type;
      return sort.order === "asc" ? a[field] - b[field] : b[field] - a[field];
    });
  }

  const total = products.length;

  const offset = (page - 1) * pageSize;
  products = products.slice(offset, offset + pageSize);

  return {
    items: products,
    pagination: {
      page,
      pageSize,
      total,
    },
  };
};
