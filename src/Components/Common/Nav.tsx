import { Link } from 'react-router-dom';
import classes from './Nav.module.css';

const Nav: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <Link to="/signin">signin</Link>
      <Link to="/signup">signup</Link>
      <Link to="/products">products</Link>
      <Link to="/cart">cart</Link>
    </nav>
  );
};
export default Nav;
