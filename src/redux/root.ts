import {UserState} from './user/interface';
import {LoginState} from './auth/login/interface';

export interface StoreInterface {
  User: UserState;
  Login: LoginState;
}

export type RootState = {
  User: StoreInterface['User'];
  Login: StoreInterface['Login'];
};
