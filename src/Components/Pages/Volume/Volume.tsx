import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Volume.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  cartActions,
  modalActions,
  RootState,
} from '../../../redux/reduxStore';
// firebase
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
// typescript
import { IVolume } from '../../../typescript/interfaces';
// components
import Info from './Info/Info';
import ChapterList from '../../Common/List/List';
import Chapter from './Chapter/Chapter';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState<IVolume>();
  const { mangaParam, volumeParam } = useParams();

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const addToCartHandler = async (volume: IVolume) => {
    if (user) {
      const cartItemRef = doc(db, 'users', user.id, 'cart', volume.id);
      // increments item's quantity
      const cartItemSnap = await getDoc(cartItemRef);
      if (cartItemSnap.exists()) {
        await updateDoc(cartItemRef, {
          quantity: increment(1),
        });
        dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
        return;
      }

      // adds the item to the cart
      await setDoc(cartItemRef, { quantity: 1 });
      dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
      return;
    }
    dispatch(modalActions.open('signin'));
  };

  useEffect(() => {
    if (mangaParam && volumeParam) {
      getDoc(doc(db, 'store', mangaParam, 'volumes', volumeParam))
        .then((volumeSnap) => {
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
      <section className={classes['volume-section']}>
        <h1 className={classes['eng-title']}>{volume?.engVolumeName}</h1>
        <h1 className={classes['jap-title']}>{volume?.japVolumeName}</h1>
        <div className={classes.content}>
          <ChapterList>
            {volume.chapters.map((c) => (
              <Chapter chapter={c} key={c.chapter} />
            ))}
          </ChapterList>
          <Info volume={volume} addToCartHandler={addToCartHandler} />
        </div>
      </section>
    );
  }

  return <h1>loading...</h1>;
};

export default Volume;
