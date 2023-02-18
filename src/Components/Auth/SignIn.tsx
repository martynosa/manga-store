import { FormEvent, useEffect, useState } from 'react';
import { emailValidator, lengthValidator } from '../../helpers/validators';
import { defaultAuthError, IAuthError, defaultError } from '../../types/error';
import classes from './Auth.module.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<IAuthError>(defaultAuthError);

  const signInHandler = (event: FormEvent) => {
    event.preventDefault();

    if (
      authError.email.status ||
      authError.password.status ||
      email === '' ||
      password === ''
    )
      return;
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

  useEffect(() => {
    console.log(authError);
  }, [authError]);

  return (
    <div className={classes['auth-container']}>
      <h1>SignIn</h1>
      <form onSubmit={signInHandler}>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="text"
            onBlur={(e) => setEmail(e.target.value)}
            onChange={(e) => validateEmailHandler(e.target.value)}
          />
          {authError.email.status && <p>{authError.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            onBlur={(e) => setPassword(e.target.value)}
            onChange={(e) => validatePasswordHandler(e.target.value)}
          />
          {authError.password.status && <p>{authError.password.message}</p>}
        </div>
        <button>sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
