import { defaultError } from '../typescript/interfaces';

export const emailValidator = (email: string) => {
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: true, message: 'Please provide a valid email.' };
  }
  return defaultError;
};

export const lengthValidator = (value: string, length: number) => {
  if (!value || value.length < length) {
    return {
      status: true,
      message: `${length} or more characters required.`,
    };
  }
  return defaultError;
};

export const repeatPasswordValidator = (
  password: string,
  repeatPassword: string
) => {
  if (!repeatPassword || password !== repeatPassword) {
    return {
      status: true,
      message: 'Repeat password does not match password.',
    };
  }
  return defaultError;
};
