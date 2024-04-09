import { createSlice } from '@reduxjs/toolkit';
import { loggedInUser, loginUser, registerUser } from './user.actions';

const initialState = {
  user: null,
  loading: false,
  initialLoading: true,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: (state) => {
      localStorage.removeItem('AuthToken');
      return {
        ...state,
        user: null,
        loading: false,
        initialLoading: false,
      };
    },
  },
  extraReducers(builder) {
    // Login Start
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        loading: true,
        initialLoading: true,
      }))
      .addCase(loginUser.fulfilled, (state, { payload }) => ({
        ...state,
        user: payload,
        loading: false,
        initialLoading: false,
      }))
      .addCase(loginUser.rejected, (state) => ({
        ...state,
        user: null,
        loading: false,
        initialLoading: false,
      }))
      // Login End

      // Logged In User Start
      .addCase(loggedInUser.pending, (state) => ({
        ...state,
        initialLoading: true,
      }))
      .addCase(loggedInUser.fulfilled, (state, { payload }) => ({
        ...state,
        user: payload,
        initialLoading: false,
      }))
      .addCase(loggedInUser.rejected, (state) => ({
        ...state,
        initialLoading: false,
      }))
      // Logged In User End

      // Register User
      .addCase(registerUser.pending, (state) => ({
        ...state,
        loading: true,
        initialLoading: true,
      }))
      .addCase(registerUser.fulfilled, (state, { payload }) => ({
        ...state,
        user: payload,
        loading: false,
        initialLoading: false,
      }))
      .addCase(registerUser.rejected, (state) => ({
        ...state,
        loading: false,
        initialLoading: false,
      }));
  },
});
const { actions, reducer } = userSlice;

export const { logout } = actions;

export default reducer;
