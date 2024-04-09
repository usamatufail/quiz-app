import axiosMain from 'axios';
import { logout } from '../store/users/users.reducer';

export const api = axiosMain.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const setupInterceptors = ({ navigate, store }) => {
  const handleError = async (error) => Promise.reject(error);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const { config } = error;
      if (error.response && error.response.status === 401 && !config._retry) {
        config._retry = true;
        store.dispatch(logout());
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AuthToken');
    config.headers = {
      ...config.headers,
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return config;
  }, handleError);
};
