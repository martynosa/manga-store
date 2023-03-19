import { FormEvent, useState } from 'react';
import classes from './AuthModal.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  RootState,
} from '../../../../redux/reduxStore';
import { initialShippingAddress } from '../../../../redux/authSlice';
// firebase
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../../../firebase/firebase';
import { setDoc } from 'firebase/firestore';
import { getProfileRef } from '../../../../firebase/firestoreReferences';
// typescript
import {
  defaultAuthError,
  defaultError,
  IAuthError,
} from '../../../../typescript/interfaces';
// helpers
import {
  emailValidator,
  lengthValidator,
  repeatPasswordValidator,
} from '../../../../helpers/validators';

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [authError, setAuthError] = useState<IAuthError>(defaultAuthError);

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);

  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (
      authError.email.status ||
      authError.displayName.status ||
      authError.password.status ||
      authError.repeatPassword.status ||
      email === '' ||
      password === '' ||
      repeatPassword === ''
    ) {
      console.log('errors =>', authError);
      return;
    }

    dispatch(loadingActions.setLoading({ ...loading, isAuthLoading: true }));

    try {
      await setPersistence(auth, browserLocalPersistence);
      const user = await createUserWithEmailAndPassword(auth, email, password);

      if (user) {
        await updateProfile(user.user, { displayName: displayName });
        await setDoc(getProfileRef(user.user.uid), initialShippingAddress);
      }

      dispatch(
        authActions.setUser({
          id: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );

      closeModal();
      dispatch(loadingActions.setLoading({ ...loading, isAuthLoading: false }));
    } catch (error) {
      console.log(error);
      dispatch(loadingActions.setLoading({ ...loading, isAuthLoading: false }));
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

  const validateDisplayName = (displayName: string) => {
    const error = lengthValidator(displayName, 3);
    if (error.status) {
      setAuthError((prevState) => {
        return { ...prevState, displayName: error };
      });
      return;
    }
    setAuthError((prevState) => {
      return { ...prevState, displayName: defaultError };
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
    return;
  };

  const validateRepeatPassword = (password: string, repeatPassword: string) => {
    const error = repeatPasswordValidator(password, repeatPassword);
    if (error.status) {
      setAuthError((prevState) => {
        return { ...prevState, repeatPassword: error };
      });
      return;
    }
    setAuthError((prevState) => {
      return { ...prevState, repeatPassword: defaultError };
    });
  };

  const onChangeEmail = (email: string) => {
    setEmail(email);
    validateEmail(email);
  };

  const onChangeDisplayName = (displayName: string) => {
    setDisplayName(displayName);
    validateDisplayName(displayName);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
    validatePassword(password);
    validateRepeatPassword(password, repeatPassword);
  };

  const onChangeRepeatPassword = (repeatPassword: string) => {
    setRepeatPassword(repeatPassword);
    validateRepeatPassword(password, repeatPassword);
  };

  return (
    <form onSubmit={signUpHandler} className={classes['auth-form']}>
      <h1>sign Up</h1>
      <div className={classes['auth-form-group']}>
        <div className="input-group">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            onChange={(e) => onChangeEmail(e.target.value)}
          />
          {authError.email.status && (
            <p className="error">{authError.email.message}</p>
          )}
          {!authError.email.status && (
            <p className="error-placeholder">no error</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="displayName">Name</label>
          <input
            id="displayName"
            type="text"
            onChange={(e) => onChangeDisplayName(e.target.value)}
          />
          {authError.displayName.status && (
            <p className="error">{authError.displayName.message}</p>
          )}
          {!authError.displayName.status && (
            <p className="error-placeholder">no error</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => onChangePassword(e.target.value)}
          />
          {authError.password.status && (
            <p className="error">{authError.password.message}</p>
          )}
          {!authError.password.status && (
            <p className="error-placeholder">no error</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="repeatPassword">repeat password</label>
          <input
            id="repeatPassword"
            type="password"
            onChange={(e) => onChangeRepeatPassword(e.target.value)}
          />
          {authError.repeatPassword.status && (
            <p className="error">{authError.repeatPassword.message}</p>
          )}
          {!authError.repeatPassword.status && (
            <p className="error-placeholder">no error</p>
          )}
        </div>
        <div className={classes['auth-button-group']}>
          <button type="button" onClick={closeModal} className="close">
            close
          </button>
          {loading.isAuthLoading ? (
            <button className="disabled" disabled={loading.isAuthLoading}>
              Loading...
            </button>
          ) : (
            <button className="sign-up">sign up</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignUpModal;
