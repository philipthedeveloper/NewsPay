import {ApiResponse} from '../../api/apiCore';

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  isLoggedIn: boolean;
}

export interface UserResponse extends ApiResponse {
  user?: User;
}

export interface UserState {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  authorizationError: string;
  user: User | null;
  accessToken: string;
}
