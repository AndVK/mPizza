import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartSlice from './slices/cart/cartSlice';
import filterRuducer from './slices/filter/filterSlice';
import pizzasSlice from './slices/pizza/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterRuducer,
    cart: cartSlice,
    pizza: pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
