import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ShippingAddress.module.css';
// firebase
import { setDoc } from 'firebase/firestore';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  RootState,
} from '../../../../redux/reduxStore';
import { getProfileRef } from '../../../../firebase/firestoreReferences';

const ShippingAddress: React.FC = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const loading = useSelector((state: RootState) => state.loading);

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

  const updateShippingAddressHandler = async (e: FormEvent) => {
    e.preventDefault();

    const newShippingAddress = {
      city,
      address,
      postCode,
      phoneNumber,
    };

    try {
      if (auth.user) {
        dispatch(
          loadingActions.setLoading({
            ...loading,
            isUpdateShippingAddressLoading: true,
          })
        );
        await setDoc(getProfileRef(auth.user.id), newShippingAddress);
        dispatch(authActions.setShippingAddress(newShippingAddress));
        dispatch(
          loadingActions.setLoading({
            ...loading,
            isUpdateShippingAddressLoading: false,
          })
        );
        navigate('/profile/overview');
      }
    } catch (error) {
      // error handlling
      console.log(error);
      dispatch(
        loadingActions.setLoading({
          ...loading,
          isUpdateShippingAddressLoading: false,
        })
      );
    }
  };

  useEffect(() => {
    setCity(auth.shippingAddress.city);
    setAddress(auth.shippingAddress.address);
    setPostCode(auth.shippingAddress.postCode);
    setPhoneNumber(auth.shippingAddress.phoneNumber);
  }, [auth]);

  return (
    <form
      onSubmit={updateShippingAddressHandler}
      className={classes['shipping-address-form']}
    >
      <div className="input-group">
        <label htmlFor="city">city</label>
        <input
          id="city"
          type="text"
          defaultValue={auth.shippingAddress.city}
          onChange={(e) => onChangeCity(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="address">address</label>
        <input
          id="address"
          type="text"
          defaultValue={auth.shippingAddress.address}
          onChange={(e) => onChangeAddress(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="post-code">post code</label>
        <input
          id="post-code"
          type="text"
          defaultValue={auth.shippingAddress.postCode}
          onChange={(e) => onChangePostCode(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="phone">phone number</label>
        <input
          id="phone"
          type="text"
          defaultValue={auth.shippingAddress.phoneNumber}
          onChange={(e) => onChangePhoneNumber(e.target.value)}
        />
      </div>
      {loading.isUpdateShippingAddressLoading ? (
        <button
          className="disabled"
          disabled={loading.isUpdateShippingAddressLoading}
        >
          Loading...
        </button>
      ) : (
        <button className="update">update</button>
      )}
    </form>
  );
};
export default ShippingAddress;
