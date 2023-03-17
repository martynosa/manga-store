import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './PurchaseHistory.module.css';
// firebase
import { db } from '../../../../firebase/firebase';
// redux
import { RootState } from '../../../../redux/reduxStore';
// components
import List from '../../../Common/List/List';
import PurchaseHistoryItem from './PurchaseHistoryItem/PurchaseHistoryItem';

const PurchaseHistory: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <div className={classes['purchase-history-content']}>
      <List>
        {auth.purchaseHistory.map((order) => (
          <PurchaseHistoryItem purchaseHistoryItem={order} />
        ))}
      </List>
    </div>
  );
};
export default PurchaseHistory;
