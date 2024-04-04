import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setAuthorization} from '../../api/apiCore';
import {getUser as getUserApi} from '../../api/user';
import {User, UserResponse, UserState} from './interface';

const INIT_USER_STATE: UserState = {
  isAuthorized: false,
  isAuthorizing: true,
  authorizationError: '',
  user: null,
  accessToken: '',
};

export const getUser = createAsyncThunk<string | undefined | any, void>(
  '@@user/FETCH_USER',
  async (data: any, thunkAPI) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        setAuthorization(accessToken);
      }
      const response = (await getUserApi()) as unknown as UserResponse;
      if (response.user) {
        return response.user;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getCurrentSession = createAsyncThunk<string | undefined, void>(
  '@@user/GET_SESSION',
  async (data: any, thunkAPI) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        setAuthorization(accessToken);
        return accessToken;
      }
      return thunkAPI.rejectWithValue('');
    } catch (error) {
      console.log('Error while getting session');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateUserState = createAsyncThunk<string | undefined | any, void>(
  '@@user/UPDATE_USER_STATE',
  async (data: any, thunkAPI) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const user = await AsyncStorage.getItem('authUser');
      let data: any = {};
      if (accessToken) {
        data.accessToken = accessToken;
      }
      if (user) {
        data.user = JSON.parse(user);
      }
      return data;
    } catch (error) {
      console.log('Error while updating user state');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'User',
  initialState: INIT_USER_STATE,
  reducers: {
    endAuthorization: (state: UserState, action) => {
      state.isAuthorized = false;
      state.isAuthorizing = false;
      state.authorizationError = 'No Internet!';
    },

    fakeAuthorization: (state: UserState, action) => {
      state.isAuthorized = true;
      state.isAuthorizing = false;
      state.authorizationError = '';
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state: UserState, action) => {
      state.isAuthorizing = true;
      state.isAuthorized = false;
    });
    builder.addCase(getUser.fulfilled, (state: UserState, action) => {
      state.isAuthorized = true;
      state.isAuthorizing = false;
      state.user = action.payload as User;
    });
    builder.addCase(getUser.rejected, (state: UserState, action) => {
      state.isAuthorized = false;
      state.isAuthorizing = false;
      state.authorizationError = action.payload as string;
      state.user = null;
    });

    // For getting current Session
    builder.addCase(
      getCurrentSession.pending,
      (state: UserState, action) => {},
    );

    builder.addCase(
      getCurrentSession.fulfilled,
      (state: UserState, action: any) => {
        state.accessToken = action.payload;
      },
    );

    builder.addCase(
      getCurrentSession.rejected,
      (state: UserState, action: any) => {
        state.accessToken = '';
      },
    );

    // Update user when login successful
    builder.addCase(
      updateUserState.fulfilled,
      (state: UserState, action: any) => {
        console.log('Action after successful login...', action);
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuthorized = true;
        state.isAuthorizing = false;
      },
    );
  },
});

export default userSlice.reducer;
export const {endAuthorization, fakeAuthorization} = userSlice.actions;
