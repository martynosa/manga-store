import { useEffect } from 'react';
import classes from './Store.module.css';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import { IVolume } from '../../types';
import Card from '../Common/Card';
// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { RootState, volumesAction } from '../../store';

const Store: React.FC = () => {
  const dispatch = useDispatch();
  const volumes = useSelector((state: RootState) => state);

  useEffect(() => {
    const products = collection(db, 'products', 'naruto', 'volumes');
    const volumesArray: IVolume[] = [];

    getDocs(products)
      .then((productsSnap) => {
        productsSnap.forEach((p) => {
          if (p.exists()) {
            const volume = p.data() as IVolume;
            volumesArray.push(volume);
          }
        });
        dispatch(volumesAction.initialize(volumesArray));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section>
      <h1 className={classes['page-title']}>Store</h1>
      <div className={classes['store-grid']}>
        {volumes.map((v) => {
          return <Card key={v.volume} volume={v} />;
        })}
      </div>
    </section>
  );
};

export default Store;
