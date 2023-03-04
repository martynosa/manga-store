// manga
export interface IChapter {
  chapter: number;
  engName: string;
  japName: string;
}

export interface IVolume {
  id: string;
  manga: string;
  volume: number;
  engVolumeName: string;
  japVolumeName: string;
  engRelease: string;
  japRelease: string;
  coverLink: string;
  chapters: IChapter[];
  price: number;
}

// user
export interface IUser {
  id: string;
  email: string | null;
  displayName: string | null;
}

// error
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

// cart
export interface ICartItem {
  id: string;
  quantity: number;
}
