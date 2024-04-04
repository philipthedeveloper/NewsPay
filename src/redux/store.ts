import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import loginReducer from './auth/login/loginSlice';
import {RootState} from './root';

const store = configureStore({
  reducer: {
    User: userReducer,
    Login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
