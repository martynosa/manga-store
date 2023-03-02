// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <>
      <h1>cart</h1>
      {JSON.stringify(cart)}
    </>
  );
};
export default Cart;
