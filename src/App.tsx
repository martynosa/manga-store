import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { authActions, RootState } from './redux/reduxStore';
// firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
// components
import ModalBackdrop from './Components/Common/Modal/ModalBackdrop';
import Nav from './Components/Common/Nav/Nav';
import Home from './Components/Pages/Home/Home';
import Cart from './Components/Pages/Cart/Cart';
import Store from './Components/Pages/Store/Store';
import Volume from './Components/Pages/Volume/Volume';
import Error from './Components/Pages/Error/Error';
import Profile from './Components/Pages/Profile/Profile';

function App() {
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  // user persistance
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authActions.setUser({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    modal.isOpen
      ? document.body.classList.add('no-scroll')
      : document.body.classList.remove('no-scroll');
  }, [modal.isOpen]);

  return (
    <>
      {modal.isOpen && <ModalBackdrop />}
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:mangaParam/:volumeParam" element={<Volume />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="address" element={<h2>address</h2>} />
          <Route path="history" element={<h2>purchase history</h2>} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
