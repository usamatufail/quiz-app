import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'config';
import { toast } from 'react-toastify';

// Get Logged In User
export const loggedInUser = createAsyncThunk('users/loggedInUser', async () => {
  const res = await api.get('/users/me');
  return res?.data;
});

// Login User
export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }) => {
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('AuthToken', res?.data?.token);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  'users/register',
  async ({ name, email, password }) => {
    try {
      const res = await api.post('/users', { name, email, password });
      localStorage.setItem('AuthToken', res?.data?.token);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
