import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <>
      <h1>Cart</h1>
      {JSON.stringify(cart)}
    </>
  );
};
export default Cart;
