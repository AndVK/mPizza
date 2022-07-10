import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
  sortBy: string;
  currentPage: string;
  category: string;
  search: string;
  order: string;
};

type Pizza = {
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

interface pizzaSliceState {
  items: Pizza[];
  status: Status;
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>( // 2 типа возвращаемый и аргументы
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, category, search, sortBy, order } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://628ac91c7886bbbb37abab9f.mockapi.io/items?limit=${8}&page=${currentPage}${category}${search}&sortBy=${sortBy}&order=${order}`,
    );
    return data;
  },
);
const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
