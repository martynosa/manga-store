import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import Chapter from '../Common/Chapter/Chapter';
import { IVolume } from '../../types/manga';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState<IVolume>();
  const { mangaParam, volumeParam } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);

  const addToCartHandler = async (volume: IVolume) => {
    console.log(volume.id);

    if (user) {
      const cartItemRef = doc(db, 'users', user.id, 'cart', volume.id);
      // increments item's quantity

      const cartItemSnap = await getDoc(cartItemRef);
      if (cartItemSnap.exists()) {
        await updateDoc(cartItemRef, {
          quantity: increment(1),
        });
        return;
      }

      // adds the item to the cart
      await setDoc(cartItemRef, { quantity: 1 });
    }
  };

  const removeFromCartHandler = async (volume: IVolume) => {
    if (user) {
      const cartItemRef = doc(db, 'users', user.id, 'cart', volume.id);
      // deletes the item if quantity's lower than 1
      const cartItemSnap = await getDoc(cartItemRef);
      if (cartItemSnap.exists()) {
        const cartItemQuantity = cartItemSnap.data().quantity;
        if (cartItemQuantity <= 1) {
          await deleteDoc(cartItemRef);
          return;
        }
      }

      // decerements item's quantity
      await updateDoc(cartItemRef, {
        quantity: increment(-1),
      });
    }
  };

  useEffect(() => {
    if (mangaParam && volumeParam) {
      getDoc(doc(db, 'store', mangaParam, 'volumes', volumeParam))
        .then((volumeSnap) => {
          console.log(volumeSnap.data());
          if (volumeSnap.exists()) {
            const volume = volumeSnap.data();
            setVolume(volume as IVolume);
          } else {
            // error handling
            console.log('no data for this volumeId');
          }
        })
        .catch((error) => {
          // error handling
          console.log(error);
        });
    }
  }, [mangaParam, volumeParam]);

  if (volume) {
    return (
      <>
        <h1>{volume?.engVolumeName}</h1>
        <div>
          {volume?.chapters.map((c) => (
            <Chapter chapter={c} key={c.chapter} />
          ))}
        </div>
        <button onClick={() => addToCartHandler(volume)}>add to cart</button>
        <button onClick={() => removeFromCartHandler(volume)}>
          remove from cart
        </button>
      </>
    );
  }

  return <h1>loading...</h1>;
};

export default Volume;
