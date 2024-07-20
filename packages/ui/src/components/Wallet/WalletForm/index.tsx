import { useFormik } from "formik";
import { useAxiosPrivate } from "../../../hooks/usePrivateAxios";
import { endpointsV1 } from "../../../environent/api-config";
import { object, string } from "yup";

const walletFormValidation = object({
  name: string().required('Wallet name is required'),
});

export const WalletForm = () => {

  const axiosPrivate = useAxiosPrivate();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: walletFormValidation,
    onSubmit: (values) => {
      const payload = {
        ...values,
      };

      axiosPrivate
        .post(endpointsV1.wallet, payload)
        .then((_) => {
          alert('success');
        })
        .catch((_) => {
          alert('err');
        });
    },
  });

  return (
    <>
      <form
        className="shadow-xl rounded-xl px-8 pt-6 pb-8 w-2/4 mt-20"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name">Wallet Name</label>
          <input
            id="name"
            name="name"
            className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
            type="text"
            placeholder="Bank Broker"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-300">{formik.errors.name}</div>
          ) : null}
        </div>
        <button
          className="flex w-full h-10 p-2 outline-none text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in bg-magenta-500 hover:bg-magenta-700"
          type="submit"
        >
          Create
        </button>
      </form>
    </>
  );
};
