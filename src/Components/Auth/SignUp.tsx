import { FormEvent, useState } from 'react';
import {
  emailValidator,
  lengthValidator,
  repeatPasswordValidator,
} from '../../helpers/validators';
import { defaultAuthError, defaultError, IAuthError } from '../../types/error';
import classes from './Auth.module.css';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [authError, setAuthError] = useState<IAuthError>(defaultAuthError);

  const signUpHandler = (e: FormEvent) => {
    e.preventDefault();

    if (
      authError.email.status ||
      authError.password.status ||
      authError.repeatPassword.status ||
      email === '' ||
      password === '' ||
      repeatPassword === ''
    ) {
      console.log('errors =>', authError);
      return;
    }

    console.log('user info =>', email, password);
  };

  const validateEmailHandler = (email: string) => {
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

  const validatePasswordHandler = (password: string) => {
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

  const validateRepeatPasswordHandler = (
    password: string,
    repeatPassword: string
  ) => {
    const error = repeatPasswordValidator(password, repeatPassword);
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
    validateEmailHandler(email);
  };

  const onChangePassword = (password: string) => {
    setPassword(password);
    validatePasswordHandler(password);
    validateRepeatPasswordHandler(password, repeatPassword);
  };

  const onChangeRepeatPassword = (repeatPassword: string) => {
    setRepeatPassword(repeatPassword);
    validateRepeatPasswordHandler(password, repeatPassword);
  };

  return (
    <div className={classes['auth-container']}>
      <h1>signUp</h1>
      <form onSubmit={signUpHandler}>
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
            type="text"
            onChange={(e) => onChangePassword(e.target.value)}
          />
          {authError.password.status && <p>{authError.password.message}</p>}
        </div>
        <div>
          <label htmlFor="repeatPassword">repeat password</label>
          <input
            id="repeatPassword"
            type="text"
            onChange={(e) => onChangeRepeatPassword(e.target.value)}
          />
          {authError.repeatPassword.status && (
            <p>{authError.repeatPassword.message}</p>
          )}
        </div>
        <button>sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
