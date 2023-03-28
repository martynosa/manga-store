import { useEffect } from 'react';
import classes from './Store.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  loadingActions,
  RootState,
  volumesActions,
} from '../../../redux/reduxStore';
// firebase
import { getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { getMangaStoreRef } from '../../../firebase/firestoreReferences';
// typescript
import { IVolume } from '../../../typescript/interfaces';
// components
import Card from './Card/Card';

const Store: React.FC = () => {
  const volumes = useSelector((state: RootState) => state.volumes);
  const loading = useSelector((state: RootState) => state.loading);

  const dispatch = useDispatch();

  const loadMoreHandler = async () => {
    dispatch(loadingActions.setPageLoading(true));
    const tempVolumes: IVolume[] = [];

    const subsequentBatches = query(
      getMangaStoreRef('naruto'),
      orderBy('volume'),
      startAfter(volumes.length),
      limit(10)
    );

    getDocs(subsequentBatches)
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = volumeSnap.data() as IVolume;
          tempVolumes.push(volume);
        });
        dispatch(volumesActions.addMore(tempVolumes));
        dispatch(loadingActions.setPageLoading(false));
      })
      .catch((error) => {
        // error handling
        console.log(error);
        dispatch(loadingActions.setPageLoading(false));
      });
  };

  useEffect(() => {
    dispatch(loadingActions.setPageLoading(true));
    const tempVolumes: IVolume[] = [];

    const firstBatchQ = query(
      getMangaStoreRef('naruto'),
      orderBy('volume'),
      limit(10)
    );

    getDocs(firstBatchQ)
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = volumeSnap.data() as IVolume;
          tempVolumes.push(volume);
        });
        dispatch(volumesActions.initialize(tempVolumes));
        dispatch(loadingActions.setPageLoading(false));
      })
      .catch((error) => {
        // error handling
        console.log(error);
        dispatch(loadingActions.setPageLoading(false));
      });
  }, []);

  return (
    <section className="page-section">
      <h1 className="page-title">Store</h1>
      <div className={classes['store-grid']}>
        {volumes.map((v) => {
          return <Card key={v.volume} volume={v} />;
        })}
      </div>
      <div className={classes['button-group']}>
        {loading.isPageLoading ? (
          <button
            onClick={loadMoreHandler}
            className="disabled"
            disabled={loading.isPageLoading}
          >
            Loading...
          </button>
        ) : (
          <button onClick={loadMoreHandler} className="load-more">
            load more
          </button>
        )}
      </div>
    </section>
  );
};

export default Store;
