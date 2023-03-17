import { useEffect } from 'react';
import classes from './Store.module.css';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, volumesActions } from '../../../redux/reduxStore';
// firebase
import { db } from '../../../firebase/firebase';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
// typescript
import { IVolume } from '../../../typescript/interfaces';
// components
import Card from './Card/Card';
import Search from './Search/Search';

const Store: React.FC = () => {
  const dispatch = useDispatch();
  const volumes = useSelector((state: RootState) => state.volumes);

  const loadMoreHandler = async () => {
    const storeRef = collection(db, 'store', 'naruto', 'volumes');
    const tempVolumes: IVolume[] = [];

    const subsequentBatches = query(
      storeRef,
      orderBy('volume'),
      startAfter(volumes.length),
      limit(10)
    );

    getDocs(subsequentBatches)
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = volumeSnap.data();
          tempVolumes.push(volume as IVolume);
        });
        dispatch(volumesActions.addMore(tempVolumes));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const storeRef = collection(db, 'store', 'naruto', 'volumes');
    const tempVolumes: IVolume[] = [];

    const firstBatch = query(storeRef, orderBy('volume'), limit(10));

    getDocs(firstBatch)
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = volumeSnap.data();
          tempVolumes.push(volume as IVolume);
        });
        dispatch(volumesActions.initialize(tempVolumes));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className={classes['store-section']}>
      <h1 className={classes['page-title']}>Store</h1>
      <Search />
      <div className={classes['store-grid']}>
        {volumes.map((v) => {
          return <Card key={v.volume} volume={v} />;
        })}
      </div>
      <div className={classes['button-group']}>
        <button onClick={loadMoreHandler} className="load-more">
          load more
        </button>
      </div>
    </section>
  );
};

export default Store;
