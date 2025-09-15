export const FILTER_FIELDS = ["rooms", "price", "area"] as const;
export type TFilterField = (typeof FILTER_FIELDS)[number];

export const SORT_FIELDS = ["floor", "price", "area"] as const;
export type TSortField = (typeof SORT_FIELDS)[number];

export const SORT_ORDERS = ["asc", "desc"] as const;
export type TSortOrder = (typeof SORT_ORDERS)[number];

export interface ISort {
  type: TSortField;
  order: TSortOrder;
}

export interface IFilters {
  rooms: number | null;
  price: [number, number] | null;
  area: [number, number] | null;
}

export type TFiltersLimits = Record<
  TFilterField,
  {
    min: number;
    max: number;
  } | null
>;
