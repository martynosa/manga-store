import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import { cartActions } from '../../reduxStore';

import Chapter from '../Common/Chapter/Chapter';
import { IVolume } from '../../types';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState<IVolume>();
  const { manga, volumeId } = useParams();
  const dispatch = useDispatch();

  const addToCartHandler = (volume: IVolume) => {
    dispatch(
      cartActions.add({
        manga: volume.manga,
        volume: volume.volume,
        quantity: 1,
      })
    );
  };

  const removeFromCartHandler = (volume: IVolume) => {
    dispatch(
      cartActions.remove({ volume: volume.volume, manga: volume.manga })
    );
  };

  useEffect(() => {
    if (volumeId && manga) {
      getDoc(doc(db, 'store', manga, 'volumes', volumeId))
        .then((volumeSnap) => {
          if (volumeSnap.exists()) {
            setVolume(volumeSnap.data() as IVolume);
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
  }, [volumeId]);

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
          add to cart
        </button>
      </>
    );
  }

  return <h1>loading...</h1>;
};

export default Volume;
