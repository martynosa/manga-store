import { defaultError } from '../types/error';

export const emailValidator = (email: string) => {
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
