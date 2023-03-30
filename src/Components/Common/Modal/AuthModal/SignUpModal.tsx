import { FormEvent, useState } from 'react';
import classes from './AuthModal.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  notificationActions,
  RootState,
} from '../../../../redux/reduxStore';
import { initialShippingAddress } from '../../../../redux/authSlice';
// firebase
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
  AuthError as firebaseAuthError,
} from 'firebase/auth';
import { firebaseAuth } from '../../../../firebase/firebase';
import { setDoc } from 'firebase/firestore';
import { getProfileRef } from '../../../../firebase/firestoreReferences';
// typescript
import {
  defaultAreTouched,
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
import { firebaseErrorTrimmer } from '../../../../helpers/firebaseErrorTrimmer';

const SignUpModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [authError, setAuthError] = useState<IAuthError>(defaultAuthError);
  const [areTouched, setAreTouched] = useState(defaultAreTouched);

  const loading = useSelector((state: RootState) => state.loading);

  const dispatch = useDispatch();

  const signUpHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!areTouched.email) {
      setAuthError((prevState) => {
        return {
          ...prevState,
          email: { status: true, message: 'Please provide a valid email.' },
        };
      });
    }

    if (!areTouched.displayName) {
      setAuthError((prevState) => {
        return {
          ...prevState,
          displayName: {
            status: true,
            message: '3 or more characters required.',
          },
        };
      });
    }

    if (!areTouched.password) {
      setAuthError((prevState) => {
        return {
          ...prevState,
          password: { status: true, message: '6 or more characters required.' },
        };
      });
    }

    if (!areTouched.repeatPassword) {
      setAuthError((prevState) => {
        return {
          ...prevState,
          repeatPassword: {
            status: true,
            message: 'Repeat password does not match password.',
          },
        };
      });
    }

    if (
      authError.email.status ||
      authError.displayName.status ||
      authError.password.status ||
      authError.repeatPassword.status ||
      !areTouched.email ||
      !areTouched.displayName ||
      !areTouched.password ||
      !areTouched.repeatPassword
    ) {
      return;
    }

    dispatch(loadingActions.setAuthLoading(true));

    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

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

      dispatch(
        notificationActions.open({
          message: `Welcome ${user.user.displayName}`,
          type: 'success',
        })
      );
      dispatch(loadingActions.setAuthLoading(false));
      closeModal();
    } catch (error) {
      // error handling
      const errorMessage = firebaseErrorTrimmer(error as firebaseAuthError);
      dispatch(
        notificationActions.open({
          message: errorMessage,
          type: 'fail',
        })
      );
      dispatch(loadingActions.setAuthLoading(false));
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

  const onBlurEmail = (email: string) => {
    setEmail(email);
    validateEmail(email);
    setAreTouched((state) => {
      return { ...state, email: true };
    });
  };

  const onBlurDisplayName = (displayName: string) => {
    setDisplayName(displayName);
    validateDisplayName(displayName);
    setAreTouched((state) => {
      return { ...state, displayName: true };
    });
  };

  const onBlurPassword = (password: string) => {
    setPassword(password);
    validatePassword(password);
    validateRepeatPassword(password, repeatPassword);
    setAreTouched((state) => {
      return { ...state, password: true };
    });
  };

  const onBlurRepeatPassword = (repeatPassword: string) => {
    setRepeatPassword(repeatPassword);
    validateRepeatPassword(password, repeatPassword);
    setAreTouched((state) => {
      return { ...state, repeatPassword: true };
    });
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
            onBlur={(e) => onBlurEmail(e.target.value)}
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
            onBlur={(e) => onBlurDisplayName(e.target.value)}
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
            onBlur={(e) => onBlurPassword(e.target.value)}
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
            onBlur={(e) => onBlurRepeatPassword(e.target.value)}
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
