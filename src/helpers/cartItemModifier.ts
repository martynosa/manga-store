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
