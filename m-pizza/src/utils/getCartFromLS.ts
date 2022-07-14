import { CartItem } from '../redux/slices/cart/types';
import { calcTotalPrice } from './calcTotalProce';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? (JSON.parse(data) as CartItem[]) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
