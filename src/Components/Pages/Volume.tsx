import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import Chapter from '../Common/Chapter/Chapter';
import { IVolume } from '../../types';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState<IVolume>();
  const { manga, volumeId } = useParams();

  const addToCartHandler = (volume: IVolume) => {};

  const removeFromCartHandler = (volume: IVolume) => {};

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
          remove from cart
        </button>
      </>
    );
  }

  return <h1>loading...</h1>;
};

export default Volume;
