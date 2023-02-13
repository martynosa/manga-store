import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reduxStore';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    // should fetch here
  }, []);

  return (
    <>
      <h1>Cart</h1>
      {JSON.stringify(cart)}
    </>
  );
};
export default Cart;
