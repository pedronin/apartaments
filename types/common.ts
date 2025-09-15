export interface IPaginate {
  page: number;
  pageSize: number;
  total: number;
}

export type LoadingState = "idle" | "initial" | "more" | "filters";
