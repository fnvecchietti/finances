import { useFormik } from 'formik';
import { date, object, string, } from 'yup';
import { endpointsV1 } from '../../environent/api-config';
import axios from 'axios';


const registerFormValidation = object({
    username: string().required(),
    password: string().required(),
    name: string().required(),
    lastanme: string().required(),
    birthday: date().required(),
    email: string().email().required(),
});

export const RegisterForm = () => {
 

  const formik = useFormik({
    initialValues: {
        username: '',
        password: '',
        name: '',
        lastanme: '',
        birthday: '',
        email: '',
    },
    validationSchema: registerFormValidation,
    onSubmit: (values) => {
      const body = {
        ...values,
      }
    
      axios
        .post(endpointsV1.stocks, body)
        .then((res) => console.log)
        .catch((err) => console.log)
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
              id="passord"
              name="passord"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="passord"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-300">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-300">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="name">Last name</label>
            <input
              id="lastanme"
              name="lastanme"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="lastanme"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastanme}
            />
            {formik.touched.lastanme && formik.errors.lastanme ? (
              <div className="text-red-300">{formik.errors.lastanme}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="purchase_date">Birthday</label>
            <input
              id="birthday"
              name="birthday"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthday.toString()}
            />
            {formik.touched.birthday && formik.errors.birthday ? (
              <div className="text-red-300">{`${formik.errors.birthday}`}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="name">Email</label>
            <input
              id="email"
              name="email"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="email"
              placeholder="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-300">{formik.errors.email}</div>
            ) : null}
          </div>

          <button
            className="flex w-full h-10 p-2 outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in hover:bg-white hover:border-black hover:text-black hover:border-2"
            type="submit"
          >
            Register
          </button>
        </form>
      </>
    );
};
