import * as url from './urls';
import {APIClient} from './apiCore';
const api = new APIClient();

export interface RegUserRequestBody {
  name: string;
  email: string;
  password: string;
  gender: 'Male' | 'Female';
  dob: string;
}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export interface LogoutUserRequestBody {
  email: string;
}

// register
export const registerUser = (data: RegUserRequestBody) => {
  return api.create(url.REGISTER_USER, data);
};

// login
export const loginUser = (data: LoginUserRequestBody) => {
  return api.create(url.LOGIN_USER, data);
};

// logout
export const logoutUser = (data: LogoutUserRequestBody) => {
  return api.create(url.LOGOUT_USER, data);
};

// get user data
export const getUser = () => {
  return api.get(url.GET_USER);
};
