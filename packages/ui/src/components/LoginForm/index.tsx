import { useFormik } from 'formik';
import {  object, string, } from 'yup';
import { endpointsV1 } from '../../environent/api-config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from '../../api/axios';


const registerFormValidation = object({
    username: string().required(),
    password: string().required(),
});

export const LoginForm = () => {
  const {setTokenWithStorage} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
    },
    validationSchema: registerFormValidation,
    onSubmit: (values) => {
      const body = {
        ...values,
      }
       axios
         .post(endpointsV1.login, body)
         .then((res) => {
          setTokenWithStorage(res.data.data)
          if( location.state && 'from' in location.state) {
            navigate(location.state.from);
          } else {
            navigate('/');
          }
         })
         .catch((err) => {
           console.log(err);
         })
         .catch((err) => {
          console.log(err);
         })
         .finally(() => {

         });
    },
  });


    return (
      <>
        <form
          className="max-w-lg shadow-xl rounded-xl px-8 pt-6 pb-8 w-2/4 mt-20"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="name">Username</label>
            <input
              id="username"
              name="username"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-300">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="name">Password</label>
            <input
              id="password"
              name="password"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-300">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            className="flex w-full h-10 p-2 outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in hover:bg-white hover:border-black hover:text-black hover:border-2"
            type="submit"
          >
            Login
          </button>
        </form>
      </>
    );
};
