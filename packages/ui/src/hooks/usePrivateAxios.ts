import { axiosPrivate } from '../api/axios';
import { useEffect } from 'react';
import { useAuth } from './useAuth';

export const useAxiosPrivate = () => {

  const { token, setTokenWithStorage } = useAuth();

  useEffect(() => {
    axiosPrivate.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
    
      axiosPrivate.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response.status === 401) {
            setTokenWithStorage(null);
          }
          return Promise.reject(error);
        },
      );
  }, [token]);

  return axiosPrivate;
};
