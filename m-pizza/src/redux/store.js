import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import filterRuducer from './slices/filterSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterRuducer,
    cart: cartSlice,
    pizza: pizzasSlice,
  },
});
