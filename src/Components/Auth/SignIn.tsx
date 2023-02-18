import { FormEvent, useEffect, useState } from 'react';
import classes from './Auth.module.css';

interface IError {
  status: boolean;
  message: string;
}

const defaultError = { status: false, message: '' };

const emailValidator = (email: string) => {
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: true, message: 'Please provide valid email.' };
  }
  return defaultError;
};

export const lengthValidator = (value: string, length: number) => {
  if (!value || value.length < length) {
    return {
      status: true,
      message: `${length} or more characters required!`,
    };
  }
  return defaultError;
};

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorObj, setErrorObj] = useState<{
    emailError: IError;
    passwordError: IError;
  }>({
    emailError: defaultError,
    passwordError: defaultError,
  });

  const signInHandler = (event: FormEvent) => {
    event.preventDefault();

    if (
      errorObj.emailError.status ||
      errorObj.passwordError.status ||
      email === '' ||
      password === ''
    )
      return;
    console.log('user info =>', email, password);
  };

  const validateEmailHandler = (email: string) => {
    const error = emailValidator(email);
    if (error.status) {
      setErrorObj((prevState) => {
        return { ...prevState, emailError: error };
      });
      return;
    }
    setErrorObj((prevState) => {
      return { ...prevState, emailError: defaultError };
    });
  };

  const validatePasswordHandler = (password: string) => {
    const error = lengthValidator(password, 6);
    if (error.status) {
      setErrorObj((prevState) => {
        return { ...prevState, passwordError: error };
      });
      return;
    }
    setErrorObj((prevState) => {
      return { ...prevState, passwordError: defaultError };
    });
  };

  useEffect(() => {
    console.log(errorObj);
  }, [errorObj]);

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
          {errorObj.emailError.status && <p>{errorObj.emailError.message}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            onBlur={(e) => setPassword(e.target.value)}
            onChange={(e) => validatePasswordHandler(e.target.value)}
          />
          {errorObj.passwordError.status && (
            <p>{errorObj.passwordError.message}</p>
          )}
        </div>
        <button>sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
