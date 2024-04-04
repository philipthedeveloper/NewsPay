import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse, setAuthorization} from '../../../api/apiCore';
import {
  LoginUserRequestBody,
  loginUser as loginUserApi,
} from '../../../api/user';
import {LoginUserResponse, LoginState} from './interface';
import {getUser} from '../../user/userSlice';

const INIT_LOGIN_STATE: LoginState = {
  isAuthenticating: false,
  isLoggedIn: false,
  loginError: '',
  loginSuccess: '',
};

export const loginUser = createAsyncThunk<
  string | undefined | any,
  LoginUserRequestBody
>('@@user/LOGIN_USER', async (data: LoginUserRequestBody, thunkAPI) => {
  try {
    const response = (await loginUserApi(data)) as unknown as LoginUserResponse;
    if (response.success) {
      setAuthorization(response.accessToken);
      await AsyncStorage.setItem('authUser', JSON.stringify(response.user));
      await AsyncStorage.setItem('accessToken', response.accessToken);
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const loginSlice = createSlice({
  name: 'Login',
  initialState: INIT_LOGIN_STATE,
  reducers: {
    resetLoginState: (state: LoginState) => {
      state.isAuthenticating = false;
      state.isLoggedIn = false;
      state.loginError = '';
    },

    successfulLogin: (state: LoginState, action) => {
      state.isAuthenticating = false;
      state.isLoggedIn = true;
      state.loginSuccess = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state: LoginState, action) => {
      state.isAuthenticating = true;
      state.isLoggedIn = false;
      state.loginError = '';
      state.loginSuccess = '';
    });

    builder.addCase(loginUser.fulfilled, (state: LoginState, action) => {
      state.isAuthenticating = false;
      state.isLoggedIn = true;
      state.loginSuccess = action.payload;
    });

    builder.addCase(loginUser.rejected, (state: LoginState, action) => {
      state.isAuthenticating = false;
      state.isLoggedIn = false;
      state.loginSuccess = '';
      state.loginError = action.payload as string;
    });

    builder.addCase(getUser.fulfilled, (state: LoginState) => {
      state.isAuthenticating = false;
      state.isLoggedIn = true;
      state.loginSuccess = '';
    });
  },
});

export default loginSlice.reducer;
export const {resetLoginState, successfulLogin} = loginSlice.actions;
