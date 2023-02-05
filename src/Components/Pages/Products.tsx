import { useEffect, useState } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import { Volume } from '../../types';

const Products: React.FC = () => {
  const [volumes, setVolumes] = useState<Volume[]>([]);

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
          setVolumes(volumesArray);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Products</h1>;{JSON.stringify(volumes)}
    </>
  );
};

export default Products;
