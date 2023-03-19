import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './Volume.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  cartActions,
  loadingActions,
  modalActions,
  RootState,
} from '../../../redux/reduxStore';
// firebase
import { getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import {
  getCartItemRef,
  getVolumeRef,
} from '../../../firebase/firestoreReferences';
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
  const loading = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();

  const addToCartHandler = async (volume: IVolume) => {
    if (user) {
      dispatch(
        loadingActions.setLoading({ ...loading, isAddToCartLoading: true })
      );

      try {
        const cartItemRef = getCartItemRef(user.id, volume.id);
        // increments item's quantity
        const cartItemSnap = await getDoc(cartItemRef);
        if (cartItemSnap.exists()) {
          await updateDoc(cartItemRef, {
            quantity: increment(1),
          });
          dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
          dispatch(
            loadingActions.setLoading({ ...loading, isAddToCartLoading: false })
          );
          return;
        }
        // adds the item to the cart
        await setDoc(cartItemRef, { quantity: 1 });
        dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
        dispatch(
          loadingActions.setLoading({ ...loading, isAddToCartLoading: false })
        );
        return;
      } catch (error) {
        // error handling
        console.log(error);
        dispatch(
          loadingActions.setLoading({ ...loading, isAddToCartLoading: false })
        );
      }
    }
    dispatch(modalActions.open('signin'));
  };

  useEffect(() => {
    if (mangaParam && volumeParam) {
      dispatch(loadingActions.setLoading({ ...loading, isPageLoading: true }));
      getDoc(getVolumeRef(mangaParam, volumeParam))
        .then((volumeSnap) => {
          if (volumeSnap.exists()) {
            const volume = volumeSnap.data();
            setVolume(volume as IVolume);
            dispatch(
              loadingActions.setLoading({ ...loading, isPageLoading: false })
            );
          } else {
            // error handling
            console.log('no data for this volumeId');
            dispatch(
              loadingActions.setLoading({ ...loading, isPageLoading: false })
            );
          }
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(
            loadingActions.setLoading({ ...loading, isPageLoading: false })
          );
        });
    }
  }, [mangaParam, volumeParam]);

  if (loading.isPageLoading) {
    return (
      <section className="loading-error-section">
        <h2 className="general loading">Loading...</h2>
      </section>
    );
  }

  if (volume) {
    return (
      <section className={classes['volume-section']}>
        <h1 className={classes['eng-title']}>{volume?.engVolumeName}</h1>
        <h2 className={classes['jap-title']}>{volume?.japVolumeName}</h2>
        <div className={classes.content}>
          <ChapterList>
            {volume.chapters.map((c) => (
              <Chapter chapter={c} key={c.chapter} />
            ))}
          </ChapterList>
          <Info
            volume={volume}
            addToCartHandler={addToCartHandler}
            isAddToCartLoading={loading.isAddToCartLoading}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="loading-error-section">
      <h2 className="general error">Volume not found.</h2>
    </section>
  );
};

export default Volume;
