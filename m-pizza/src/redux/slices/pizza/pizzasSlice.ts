import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, pizzaSliceState, SearchPizzaParams, Status } from './types';

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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
