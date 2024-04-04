import {ApiResponse} from '../../../api/apiCore';
import {User} from '../../user/interface';

export interface LoginUserResponse extends ApiResponse {
  user: User;
  accessToken: string;
}

export interface LoginState {
  isLoggedIn: boolean;
  isAuthenticating: boolean;
  loginError: string;
  loginSuccess: string;
}
