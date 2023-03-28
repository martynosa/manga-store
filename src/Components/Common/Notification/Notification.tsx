import classes from './Notification.module.css';

const Notification: React.FC = () => {
  return (
    <div className={classes.notification}>
      {/* <p>✔️ Logged in successfully</p> */}
      <p>❌ Logged in failed</p>
    </div>
  );
};

export default Notification;
