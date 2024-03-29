export type CartItem = {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  type: string | number;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
