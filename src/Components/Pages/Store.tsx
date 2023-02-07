import { useEffect } from 'react';
import classes from './Products.module.css';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import { Volume } from '../../types';
import Card from '../Common/Card';
// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { RootState, volumesAction } from '../../store';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const volumes = useSelector((state: RootState) => state);

  useEffect(() => {
    const products = collection(db, 'products', 'naruto', 'volumes');
    const volumesArray: Volume[] = [];

    getDocs(products)
      .then((productsSnap) => {
        productsSnap.forEach((p) => {
          if (p.exists()) {
            const volume = p.data() as Volume;
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
      <h1>Products</h1>
      <div className={classes['products-grid']}>
        {volumes.map((v) => {
          return <Card volume={v} />;
        })}
      </div>
    </section>
  );
};

export default Products;
