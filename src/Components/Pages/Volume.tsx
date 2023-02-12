import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import { cartActions } from '../../store';

import Chapter from '../Common/Chapter/Chapter';
import { IChapter, IVolume } from '../../types';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState<IVolume>();
  const { volumeId } = useParams();
  const dispatch = useDispatch();

  const addToCartHandler = (chapter: IChapter, volume: IVolume) => {
    dispatch(
      cartActions.add({
        product: 'naruto',
        volumeId: volume.volume,
        chapterId: chapter.chapter,
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    if (volumeId) {
      getDoc(doc(db, 'products', 'naruto', 'volumes', volumeId))
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

  return (
    <>
      <h1>{volume?.engVolumeName}</h1>
      <div>
        {volume?.chapters.map((c) => (
          <Chapter
            chapter={c}
            key={c.chapter}
            addToCartHandler={() => addToCartHandler(c, volume)}
          />
        ))}
      </div>
    </>
  );
};

export default Volume;
