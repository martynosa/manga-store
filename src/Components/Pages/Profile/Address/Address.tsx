import classes from './Address.module.css';

const Address: React.FC = () => {
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
      <button className="sign-in">update</button>
    </form>
  );
};
export default Address;
