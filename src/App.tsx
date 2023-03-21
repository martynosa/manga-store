import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { authActions, loadingActions, RootState } from './redux/reduxStore';
// firebase
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
// components
import ModalBackdrop from './Components/Common/Modal/ModalBackdrop';
import Nav from './Components/Common/Nav/Nav';
import Home from './Components/Pages/Home/Home';
import Cart from './Components/Pages/Cart/Cart';
import Store from './Components/Pages/Store/Store';
import Volume from './Components/Pages/Volume/Volume';
import Error from './Components/Pages/Error/Error';
import Profile from './Components/Pages/Profile/Profile';
import ShippingAddress from './Components/Pages/Profile/ShippingAddress/ShippingAddress';
import PurchaseHistory from './Components/Pages/Profile/PurchaseHistory/PurchaseHistory';
import Overview from './Components/Pages/Profile/Overview/Overview';

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
      dispatch(loadingActions.setIsAuthStateChanging(false));
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
          <Route path="" element={<Navigate to="overview" />} />
          <Route path="overview" element={<Overview />} />
          <Route path="shippingAddress" element={<ShippingAddress />} />
          <Route path="purchaseHistory" element={<PurchaseHistory />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
