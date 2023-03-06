import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { authActions, RootState } from './redux/reduxStore';
// firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
// components
import Modal from './Components/Common/Modal/Modal';
import Nav from './Components/Common/Nav/Nav';
import Home from './Components/Pages/Home/Home';
import Cart from './Components/Pages/Cart/Cart';
import Store from './Components/Pages/Store/Store';
import Volume from './Components/Pages/Volume/Volume';
import Error from './Components/Pages/Error/Error';

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
      {modal.isOpen && <Modal />}
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:mangaParam/:volumeParam" element={<Volume />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
