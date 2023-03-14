import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../firebase/firebase';
import { authActions, RootState } from '../../../../redux/reduxStore';
import { IShippingAddress } from '../../../../typescript/interfaces';
import classes from './ShippingAddress.module.css';

const ShippingAddress: React.FC = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const onChangeCity = (city: string) => {
    setCity(city);
    // validate here
  };

  const onChangeAddress = (address: string) => {
    setAddress(address);
    // validate here
  };

  const onChangePostCode = (postCode: string) => {
    setPostCode(postCode);
    // validate here
  };

  const onChangePhoneNumber = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
    // validate here
  };

  const updateHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (
      city === '' ||
      address === '' ||
      postCode === '' ||
      phoneNumber === ''
    ) {
      console.log('missing input data');
      return;
    }

    try {
      if (auth.user) {
        const profileInfo = doc(db, 'users', auth.user.id);
        await setDoc(profileInfo, {
          city,
          address,
          postCode,
          phoneNumber,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.user) {
      const userShippingAddressRef = doc(db, 'users', auth.user.id);

      getDoc(userShippingAddressRef)
        .then((shippingAddressSnap) => {
          if (shippingAddressSnap.exists()) {
            const shippingAddress =
              shippingAddressSnap.data() as IShippingAddress;
            dispatch(authActions.setShippingAddress(shippingAddress));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth.user]);

  return (
    <form onSubmit={updateHandler} className={classes.form}>
      <div className={classes['input-group']}>
        <label htmlFor="city">city</label>
        <input
          id="city"
          type="text"
          defaultValue={auth.shippingAddress.city}
          onChange={(e) => onChangeCity(e.target.value)}
        />
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="address">address</label>
        <input
          id="address"
          type="text"
          defaultValue={auth.shippingAddress.address}
          onChange={(e) => onChangeAddress(e.target.value)}
        />
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="post-code">post code</label>
        <input
          id="post-code"
          type="text"
          defaultValue={auth.shippingAddress.postCode}
          onChange={(e) => onChangePostCode(e.target.value)}
        />
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="phone">phone number</label>
        <input
          id="phone"
          type="text"
          defaultValue={auth.shippingAddress.phoneNumber}
          onChange={(e) => onChangePhoneNumber(e.target.value)}
        />
      </div>
      <button className="update">update</button>
    </form>
  );
};
export default ShippingAddress;
