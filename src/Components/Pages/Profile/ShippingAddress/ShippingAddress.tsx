import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ShippingAddress.module.css';
// firebase
import { db } from '../../../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';

const ShippingAddress: React.FC = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();
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
        navigate('/profile/overview');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={updateHandler} className={classes['shipping-address-form']}>
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
