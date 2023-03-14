import { useState } from 'react';
import classes from './ShippingAddress.module.css';

const ShippingAddress: React.FC = () => {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <form className={classes.form}>
      <div className={classes['input-group']}>
        <label htmlFor="city">city</label>
        <input id="city" type="text" />
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="address">address</label>
        <input id="address" type="text" />
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="post-code">post code</label>
        <input id="post-code" type="text" />
      </div>
      <div className={classes['input-group']}>
        <label htmlFor="phone">phone number</label>
        <input id="phone" type="text" />
      </div>
      <button className="update">update</button>
    </form>
  );
};
export default ShippingAddress;
