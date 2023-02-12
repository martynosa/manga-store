import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { cartActions, RootState } from './store';

import Cart from './Components/Pages/Cart';
import Nav from './Components/Common/Nav/Nav';
import Store from './Components/Pages/Store';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Volume from './Components/Pages/Volume';
import Error from './Components/Pages/Error';

function App() {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const pastCart = localStorage.getItem('cart');

    if (pastCart) {
      const cartKeys = Object.keys(JSON.parse(pastCart));
      if (cartKeys.length !== 0) {
        dispatch(cartActions.initalize(JSON.parse(pastCart)));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:volumeId" element={<Volume />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
