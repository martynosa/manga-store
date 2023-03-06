import { ICartItem } from '../typescript/interfaces';

export const cartItemCountReducer = (cart: ICartItem[]) => {
  const count = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);
  return count;
};
