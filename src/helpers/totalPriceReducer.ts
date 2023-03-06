import { ICartItem } from '../typescript/interfaces';

export const totalPriceReducer = (cart: ICartItem[]): number => {
  const count = cart.reduce((accumulator, item) => {
    if (item.volume) {
      return accumulator + item.quantity * item.volume?.price;
    }
    return 0;
  }, 0);

  return count;
};
