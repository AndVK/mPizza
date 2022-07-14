export type SearchPizzaParams = {
  sortBy: string;
  currentPage: string;
  category: string;
  search: string;
  order: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface pizzaSliceState {
  items: Pizza[];
  status: Status;
}
