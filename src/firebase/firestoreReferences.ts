import { db } from './firebase';
import { collection, doc } from 'firebase/firestore';

export const getProfileRef = (userId: string) => {
  return doc(db, 'users', userId);
};

export const getVolumeRef = (manga: string, volumeId: string) => {
  return doc(db, 'store', manga, 'volumes', volumeId);
};

export const getCartRef = (userId: string) => {
  return collection(db, 'users', userId, 'cart');
};

export const getCartItemRef = (userId: string, volumeId: string) => {
  return doc(db, 'users', userId, 'cart', volumeId);
};

export const getShippingAddressRef = (userId: string) => {
  return doc(db, 'users', userId);
};

export const getPurchaseHistoryRef = (userId: string) => {
  return collection(db, 'users', userId, 'purchaseHistory');
};

export const getMangaStoreRef = (manga: string) => {
  return collection(db, 'store', manga, 'volumes');
};
