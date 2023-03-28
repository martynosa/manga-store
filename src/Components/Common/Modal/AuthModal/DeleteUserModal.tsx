import { FormEvent, useState } from 'react';
import classes from './AuthModal.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  RootState,
} from '../../../../redux/reduxStore';
// firebase
import { firebaseAuth } from '../../../../firebase/firebase';
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
// typescript
import {
  defaultAuthError,
  IAuthError,
  defaultError,
} from '../../../../typescript/interfaces';
// helpers
import {
  emailValidator,
  lengthValidator,
} from '../../../../helpers/validators';
import { useNavigate } from 'react-router-dom';

const DeleteUserModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<IAuthError>(defaultAuthError);

  const loading = useSelector((state: RootState) => state.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteUserHandler = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loadingActions.setAuthLoading(true));
    // will need to reauthenticate here, if the user logged in too long ago it will throw an error into the catch block
    try {
      const user = firebaseAuth.currentUser;
      const credentials = EmailAuthProvider.credential(email, password);
      if (user) {
        // reAuth
        await reauthenticateWithCredential(user, credentials);

        // user deletion

        await deleteUser(user);
        dispatch(authActions.unsetUser());
        dispatch(loadingActions.setAuthLoading(false));
        closeModal();
        navigate('/');
      }
    } catch (error) {
      // error handling here
      console.log(error);
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
    <form onSubmit={deleteUserHandler} className={classes['auth-form']}>
      <h1>Account Deletion</h1>
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
        <div className={classes['auth-button-group']}>
          <button type="button" onClick={closeModal} className="close">
            close
          </button>
          {loading.isAuthLoading ? (
            <button className="disabled" disabled={loading.isAuthLoading}>
              Loading...
            </button>
          ) : (
            <button className="delete">delete</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default DeleteUserModal;
