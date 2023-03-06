import { ICartItem, IVolume } from '../typescript/interfaces';

export const cartItemModifier = (
  volumes: IVolume[],
  cart: ICartItem[]
): ICartItem[] => {
  const filteredVolumes: ICartItem[] = [];

  for (const item of cart) {
    for (const volume of volumes) {
      if (item.id === volume.id)
        filteredVolumes.push({ ...item, volume: volume });
    }
  }

  return filteredVolumes;
};

export const cartItemCountReducer = (cart: ICartItem[]) => {
  const count = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);
  return count;
};

export const totalPriceReducer = (cart: ICartItem[]): number => {
  const count = cart.reduce((accumulator, item) => {
    if (item.volume) {
      return accumulator + item.quantity * item.volume.price;
    }
    return 0;
  }, 0);

  return count;
};
