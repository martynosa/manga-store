import { useEffect } from 'react';
import classes from './Store.module.css';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, volumesActions } from '../../../redux/reduxStore';
// firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
// typescript
import { IVolume } from '../../../typescript/interfaces';
// components
import Card from './Card/Card';
import Search from './Search/Search';

const Store: React.FC = () => {
  const dispatch = useDispatch();
  const volumes = useSelector((state: RootState) => state.volumes);

  useEffect(() => {
    // naruto arg hardcoded for now
    const storeRef = collection(db, 'store', 'naruto', 'volumes');
    const volumesArray: IVolume[] = [];

    getDocs(storeRef)
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = { ...volumeSnap.data() };
          volumesArray.push(volume as IVolume);
        });
        dispatch(volumesActions.initialize(volumesArray));
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
    </section>
  );
};

export default Store;
