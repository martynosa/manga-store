import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase/firebase';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { authAction } from '../../redux/authSlice';
import { emailValidator, lengthValidator } from '../../helpers/validators';
import { defaultAuthError, IAuthError, defaultError } from '../../types/error';
import classes from './Auth.module.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<IAuthError>(defaultAuthError);
  const dispatch = useDispatch();

  const signInHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (
      authError.email.status ||
      authError.password.status ||
      email === '' ||
      password === ''
    ) {
      console.log('errors =>', authError);
      return;
    }

    try {
      await setPersistence(auth, browserLocalPersistence);
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);

      dispatch(
        authAction.setUser({
          id: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const validateEmail = (email: string) => {
    const error = emailValidator(email);
    if (error.status) {
      setAuthError((prevState) => {
        return { ...prevState, email: error };
      });
      return;
    }
    setAuthError((prevState) => {
      return { ...prevState, email: defaultError };
    });
  };

  const validatePassword = (password: string) => {
    const error = lengthValidator(password, 6);
    if (error.status) {
      setAuthError((prevState) => {
        return { ...prevState, password: error };
      });
      return;
    }
    setAuthError((prevState) => {
      return { ...prevState, password: defaultError };
    });
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
    validateEmail(email);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
    validatePassword(password);
  };

  return (
    <div className={classes['auth-container']}>
      <h1>SignIn</h1>
      <form onSubmit={signInHandler}>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            onChange={(e) => onChangeEmail(e.target.value)}
          />
          {authError.email.status && <p>{authError.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => onChangePassword(e.target.value)}
          />
          {authError.password.status && <p>{authError.password.message}</p>}
        </div>
        <button>sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
