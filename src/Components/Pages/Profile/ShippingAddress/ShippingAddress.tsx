import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ShippingAddress.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  notificationActions,
  RootState,
} from '../../../../redux/reduxStore';
// firebase
import { setDoc } from 'firebase/firestore';
import { getProfileRef } from '../../../../firebase/firestoreReferences';

const ShippingAddress: React.FC = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isUpdateShippingAddressLoading, setIsUpdateShippingAddressLoading] =
    useState(false);

  const auth = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        setIsUpdateShippingAddressLoading(true);
        await setDoc(getProfileRef(auth.user.id), newShippingAddress);
        dispatch(authActions.setShippingAddress(newShippingAddress));
        dispatch(
          notificationActions.open({
            message: 'address updated',
            type: 'success',
          })
        );
        setIsUpdateShippingAddressLoading(false);
        navigate('/profile/overview');
      }
    } catch (error) {
      // error handlling
      console.log(error);
      setIsUpdateShippingAddressLoading(false);
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
          onBlur={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="address">address</label>
        <input
          id="address"
          type="text"
          defaultValue={auth.shippingAddress.address}
          onBlur={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="post-code">post code</label>
        <input
          id="post-code"
          type="text"
          defaultValue={auth.shippingAddress.postCode}
          onBlur={(e) => setPostCode(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="phone">phone number</label>
        <input
          id="phone"
          type="text"
          defaultValue={auth.shippingAddress.phoneNumber}
          onBlur={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      {isUpdateShippingAddressLoading ? (
        <button className="disabled" disabled={isUpdateShippingAddressLoading}>
          Loading...
        </button>
      ) : (
        <button className="update">update</button>
      )}
    </form>
  );
};

export default ShippingAddress;
