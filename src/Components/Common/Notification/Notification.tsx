import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions, RootState } from '../../../redux/reduxStore';
import classes from './Notification.module.css';

const Notification: React.FC = () => {
  const notification = useSelector((state: RootState) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        dispatch(notificationActions.close());
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  let notificationClasses = classes.notification;
  switch (notification.type) {
    case 'success':
      notificationClasses = `${notificationClasses} ${classes.success}`;
      break;
    case 'fail':
      notificationClasses = `${notificationClasses} ${classes.fail}`;
  }

  const successMessage = <p>✔️ {notification.message}.</p>;
  const failMessage = <p>❌ {notification.message}.</p>;

  return (
    <div className={notificationClasses}>
      {notification.type === 'success' && successMessage}
      {notification.type === 'fail' && failMessage}
    </div>
  );
};

export default Notification;
