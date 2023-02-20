export interface IError {
  status: boolean;
  message: string;
}
export interface IAuthError {
  email: IError;
  displayName: IError;
  password: IError;
  repeatPassword: IError;
}

export const defaultError = { status: false, message: '' };

export const defaultAuthError = {
  email: defaultError,
  displayName: defaultError,
  password: defaultError,
  repeatPassword: defaultError,
};
