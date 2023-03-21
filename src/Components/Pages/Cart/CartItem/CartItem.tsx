import { useState } from 'react';
import classes from './CartItem.module.css';
// firebase
import { getCartItemRef } from '../../../../firebase/firestoreReferences';
import {
  deleteDoc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  cartActions,
  modalActions,
  RootState,
} from '../../../../redux/reduxStore';
// typescript
import { ICartItem, IVolume } from '../../../../typescript/interfaces';

const CartItem: React.FC<{ cartItem: ICartItem }> = ({ cartItem }) => {
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);
  const [isRemoveFromCartLoading, setIsRemoveFromCartLoading] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const addToCartHandler = async (volume: IVolume) => {
    if (auth.user) {
      setIsAddToCartLoading(true);

      try {
        const cartItemRef = getCartItemRef(auth.user.id, volume.id);
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

  const removeFromCartHandler = async (volume: IVolume) => {
    if (auth.user) {
      setIsRemoveFromCartLoading(true);
      try {
        const cartItemRef = getCartItemRef(auth.user.id, volume.id);
        // deletes the item if quantity's lower than 1
        const cartItemSnap = await getDoc(cartItemRef);
        if (cartItemSnap.exists()) {
          const cartItemQuantity = cartItemSnap.data().quantity;
          if (cartItemQuantity <= 1) {
            await deleteDoc(cartItemRef);
            dispatch(cartActions.remove({ id: volume.id, quantity: 1 }));
            setIsRemoveFromCartLoading(false);
            return;
          }
        }
        // decerements item's quantity
        await updateDoc(cartItemRef, {
          quantity: increment(-1),
        });
        setIsRemoveFromCartLoading(false);
        dispatch(cartActions.remove({ id: volume.id, quantity: 1 }));
      } catch (error) {
        // error handling
        console.log(error);
        setIsRemoveFromCartLoading(false);
      }
    }
  };

  const removeFromCartButton = isRemoveFromCartLoading ? (
    <button className="disabled" disabled={isRemoveFromCartLoading}>
      - 1
    </button>
  ) : (
    <button
      className="minus-one"
      onClick={() => removeFromCartHandler(cartItem.volume!)}
    >
      - 1
    </button>
  );

  const addToCartButton = isAddToCartLoading ? (
    <button className="disabled" disabled={isAddToCartLoading}>
      + 1
    </button>
  ) : (
    <button
      className="plus-one"
      onClick={() => addToCartHandler(cartItem.volume!)}
    >
      + 1
    </button>
  );

  if (cartItem.volume) {
    return (
      <div className={classes['cart-item']}>
        <img src={cartItem.volume.coverLink} alt="cover" />
        <div className={classes.content}>
          <div className={classes.details}>
            <p>Vol. {cartItem.volume.volume}</p>
            <p>{cartItem.volume.engVolumeName}</p>
            <p>
              <span>Price: </span>${cartItem.volume.price}
            </p>
          </div>
          <div className={classes.price}>
            <p>Total:</p>
            <p>
              {cartItem.quantity} x {cartItem.volume.price}
            </p>
            <p>=</p>
            <p>${(cartItem.quantity * cartItem.volume.price).toFixed(2)}</p>
          </div>
          <div className={classes['button-group']}>
            {removeFromCartButton}
            {addToCartButton}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes['cart-item']}>
      <p className={classes['error']}>Volume not found.</p>
    </div>
  );
};
export default CartItem;
