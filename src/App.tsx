import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

import Cart from './Components/Pages/Cart';
import Nav from './Components/Common/Nav/Nav';
import Store from './Components/Pages/Store';
import Volume from './Components/Pages/Volume';
import Error from './Components/Pages/Error';
import { useEffect } from 'react';
import { authAction } from './redux/authSlice';
import Home from './Components/Pages/Home';

function App() {
  const dispatch = useDispatch();

  // user persistance
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authAction.setUser({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      }
    });
  }, []);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:manga/:volumeId" element={<Volume />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
