import { useSelector } from 'react-redux';
import classes from './PurchaseHistory.module.css';
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
          <PurchaseHistoryItem purchaseHistoryItem={order} key={order.id} />
        ))}
      </List>
    </div>
  );
};
export default PurchaseHistory;
