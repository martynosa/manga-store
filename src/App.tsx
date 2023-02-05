import { Route, Routes } from 'react-router-dom';
import Cart from './Components/Pages/Cart';
import Nav from './Components/Common/Nav';
import Products from './Components/Pages/Products';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
