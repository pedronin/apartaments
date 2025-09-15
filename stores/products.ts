import { fetchProductsFromServer, fetchFilterLimitsFromServer } from "@/back";
import { SORT_ORDERS, SORT_FIELDS } from "@/types";

import type { LocationQuery } from "vue-router";
import type {
  IFilters,
  ISort,
  TFiltersLimits,
  TSortOrder,
  IProduct,
  TSortField,
  LoadingState,
  IPaginate,
} from "@/types";

interface IState {
  items: IProduct[];
  loadingState: LoadingState;
  error: string | null;
  sort: ISort | null;
  filters: IFilters;
  filtersApplied: IFilters;
  filterLimits: TFiltersLimits;
  pagination: IPaginate;
}

const defaultFilters = { price: null, area: null, rooms: null };

export const useProductsStore = defineStore("products", {
  state: (): IState => ({
    items: [],
    pagination: { page: 1, pageSize: 20, total: 0 },
    loadingState: "initial",
    error: null,
    sort: null,
    filters: { ...defaultFilters },
    filtersApplied: { ...defaultFilters },
    filterLimits: { ...defaultFilters },
  }),
  getters: {
    hasMoreItems(): boolean {
      return this.pagination.page < this.totalPages;
    },

    totalPages(): number {
      if (!this.pagination.pageSize) return 1;
      return Math.ceil(this.pagination.total / this.pagination.pageSize);
    },

    isLoading(): boolean {
      return this.loadingState !== "idle";
    },
    isInitialLoading(): boolean {
      return this.loadingState === "initial";
    },
    isLoadingMore(): boolean {
      return this.loadingState === "more";
    },
    isFiltersLoading(): boolean {
      return this.loadingState === "filters";
    },

    hasNotAppliedFilters(): boolean {
      return (
        JSON.stringify(this.filters) !== JSON.stringify(this.filtersApplied)
      );
    },
    hasFilters(): boolean {
      return JSON.stringify(this.filters) !== JSON.stringify(defaultFilters);
    },
  },
  actions: {
    async fetchData() {
      try {
        const [productsData, filterLimits] = await Promise.all([
          fetchProductsFromServer(
            this.filtersApplied,
            this.sort,
            this.pagination.page,
            this.pagination.pageSize
          ),
          fetchFilterLimitsFromServer(),
        ]);

        this.items = productsData.items;
        this.pagination = productsData.pagination;
        this.filterLimits = filterLimits;
      } catch (err) {
        this.error = `Произошла ошибка во время загруки данных: ${err}`;
      } finally {
        this.loadingState = "idle";
      }
    },
    async fetchProducts(mode: LoadingState = "initial") {
      try {
        this.loadingState = mode;

        const data = await fetchProductsFromServer(
          this.filtersApplied,
          this.sort,
          this.pagination.page,
          this.pagination.pageSize
        );

        if (mode === "more") {
          this.items = [...this.items, ...data.items];
        } else {
          this.items = data.items || [];
        }

        this.pagination = data.pagination;
      } catch (err) {
        this.error = `Произошла ошибка во время загруки данных: ${err}`;
      } finally {
        this.loadingState = "idle";
      }
    },

    async showMore() {
      if (this.isLoading || !this.hasMoreItems) return;

      this.pagination.page += 1;
      await this.fetchProducts("more");
    },

    async setSort(newVal: ISort | null, initial?: boolean) {
      this.sort = newVal;

      if (!initial) {
        this.pagination.page = 1;
        await this.fetchProducts("filters");
      }
    },

    async applyFilters() {
      this.filtersApplied = { ...this.filters };
      this.pagination.page = 1;
      await this.fetchProducts("filters");
    },
    setFilters(newFilters: Partial<IFilters>) {
      this.filters = { ...this.filters, ...newFilters };
    },
    async resetFilters() {
      const needUpdate =
        JSON.stringify(this.filtersApplied) !== JSON.stringify(defaultFilters);

      this.filters = { ...defaultFilters };
      this.filtersApplied = { ...defaultFilters };

      if (needUpdate) {
        await this.fetchProducts("filters");
      }
    },

    initFiltersAndSortFromQuery(query: LocationQuery) {
      const filters: Partial<IFilters> = {};

      if (query.rooms && !isNaN(Number(query.rooms))) {
        filters.rooms = Number(query.rooms);
      }
      if (query.price && typeof query.price === "string") {
        const range = query.price
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n));

        if (range.length === 2) {
          filters.price = range as [number, number];
        }
      }
      if (query.area && typeof query.area === "string") {
        const range = query.area
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n));

        if (range.length === 2) {
          filters.area = range as [number, number];
        }
      }

      this.setFilters(filters);
      this.filtersApplied = { ...this.filters };

      if (query.sort && typeof query.sort === "string") {
        const [type, order] = query.sort.split(":");

        if (
          (SORT_FIELDS as readonly string[]).includes(type) &&
          (SORT_ORDERS as readonly string[]).includes(order)
        ) {
          this.setSort(
            {
              type: type as TSortField,
              order: order as TSortOrder,
            },
            true
          );
        }
      }
    },
  },
});
