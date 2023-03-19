import classes from './Info.module.css';
// typescript
import { IVolume } from '../../../../typescript/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getCartItemRef } from '../../../../firebase/firestoreReferences';
import { getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import {
  cartActions,
  modalActions,
  RootState,
} from '../../../../redux/reduxStore';

interface IProps {
  volume: IVolume;
}

const Info: React.FC<IProps> = ({ volume }) => {
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const addToCartHandler = async (volume: IVolume) => {
    if (user) {
      setIsAddToCartLoading(true);

      try {
        const cartItemRef = getCartItemRef(user.id, volume.id);
        // increments item's quantity
        const cartItemSnap = await getDoc(cartItemRef);
        if (cartItemSnap.exists()) {
          await updateDoc(cartItemRef, {
            quantity: increment(1),
          });
          dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
          setIsAddToCartLoading(false);
          return;
        }
        // adds the item to the cart
        await setDoc(cartItemRef, { quantity: 1 });
        dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
        setIsAddToCartLoading(false);
        return;
      } catch (error) {
        // error handling
        console.log(error);
        setIsAddToCartLoading(false);
      }
    }
    dispatch(modalActions.open('signin'));
  };

  return (
    <div className={classes.info}>
      <h2>
        Vol. <span>{volume.volume}</span>
      </h2>
      <p>
        Price: <span>${volume.price}</span>
      </p>
      <img src={volume.coverLink}></img>

      <p>
        <span>Western release: </span>
        {volume.engRelease}
      </p>
      <p>
        <span>Japanese release: </span> {volume.japRelease}
      </p>
      {isAddToCartLoading ? (
        <button className="disabled" disabled={isAddToCartLoading}>
          Loading...
        </button>
      ) : (
        <button onClick={() => addToCartHandler(volume)}>add to cart</button>
      )}
    </div>
  );
};
export default Info;
