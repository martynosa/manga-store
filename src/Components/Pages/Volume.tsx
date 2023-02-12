import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import Chapter from '../Common/Chapter/Chapter';
import { IVolume } from '../../types';

const Volume: React.FC = () => {
  const [volume, setVolume] = useState<IVolume>();
  const { volumeId } = useParams();

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
          <Chapter chapter={c} key={c.chapter} />
        ))}
      </div>
    </>
  );
};

export default Volume;
