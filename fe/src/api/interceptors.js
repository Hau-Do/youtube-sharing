import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from 'stores/auth';
import apiConfig from './config';

const newInstance = axios.create();
const handleRefreshToken = async () => {
  const { tokens, logoutAction, setAuthState } = useAuthStore.getState();
  try {
    const response = await newInstance({
      url: `${apiConfig.API.AUTH_SERVICE}/refresh-tokens`,
      method: 'post',
      data: {
        refreshToken: tokens?.refresh?.token,
      },
    });
    const { data } = response;
    setAuthState({
      tokens: data,
    });
    return data;
  } catch (error) {
    logoutAction();
    return null;
  }
};
// Add a request interceptor
axios.interceptors.request.use(
  async (config) => {
    const newConfig = { ...config };
    // const { auth } = store.getState();
    const { tokens, logoutAction } = useAuthStore.getState();

    const token = tokens?.access?.token;
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
      const accessExpiredTime = new Date(tokens?.access?.expires).getTime();
      const refreshExpiredTime = new Date(tokens?.refresh?.expires).getTime();
      const now = Date.now();
      if (accessExpiredTime < now) {
        const data = await handleRefreshToken();
        if (!data) logoutAction();
        else {
          newConfig.headers.Authorization = `Bearer ${data?.access?.token}`;
        }
      }
      if (now > refreshExpiredTime) {
        logoutAction();
      }
    }

    return newConfig;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error(
      error?.response?.data?.message || 'Oops something went wrongs...'
    );
    return Promise.reject(error);
  }
);
