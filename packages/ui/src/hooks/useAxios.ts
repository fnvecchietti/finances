// import axios, { AxiosError, AxiosResponse } from 'axios';
// import { API_BASE_URL } from '../environent/api-config';
// import { AuthContext } from '../context';
// import { useContext, useEffect, useState } from 'react';

//   const axiosIntance = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const axiosWithContext = (context: any) => {

//     axiosIntance.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       },
//     );
  
//     axiosIntance.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         if (error.response.status === 401) {
//           context.setTokenWithStorage(null)
//         }
//         return Promise.reject(error);
//       },
//     );

//     return axiosIntance;
//   }

// export const useAxios = ({
//   url,
//   method,
//   body = null,
// }: {
//   url: string;
//   method: 'get' | 'post' | 'put' | 'patch';
//   body: any;
// }) => {
//   const { setTokenWithStorage } = useContext(AuthContext);
//   const [response, setResponse] = useState<AxiosResponse['data'] | null>(null);
//   const [error, setError] = useState<AxiosError | string>('');
//   const [loading, setLoading] = useState(true);



//   const fetchData = () => {
//     axiosWithContext({setTokenWithStorage})[method](url, body)
//       .then((res: AxiosResponse) => {
//         setResponse(res.data);
//       })
//       .catch((err: AxiosError) => {
//         setError(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [method, url, body]);

//   return { response, error, loading, setLoading };
// };

// export const simlpeAxiosFetch = (context: any) => {
//   return axiosWithContext(context);
// }