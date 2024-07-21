import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import { endpointsV1 } from '../../../environent/api-config';
import { Loading } from '../../common/LoadingBar';
import { ErrorPage } from '../../common/Errorpage';
import { useEffect, useState } from 'react';
import { useAxiosPrivate } from '../../../hooks/usePrivateAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { HookApiResponse } from '../../../types';
import { useNotification } from '../../../hooks/useNotifications';

const entryFormValidationSchema = object({
  amount: number().required('Required'),
  description: string().required('Required').min(3, 'min 3 characters'),
  currency: string().required('Required'),
  date: date().required('Required'),
});

export const MovementForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const {addNotification} = useNotification();
  const [movementTypes, setMovementTypes] = useState<HookApiResponse>({data: null, error: null});
  const [loading, setLoading] = useState(true)
  
   useEffect(()=> {

    axiosPrivate.get(endpointsV1.movement_type)
    .then((res: AxiosResponse) =>{
      setMovementTypes({...movementTypes,data: res.data})
    })
    .catch((err: AxiosError)=> {
      setMovementTypes({...movementTypes, error: err})
    })
    .finally(()=> {
      setLoading(false)
    });

  },[])

  const formik = useFormik({
    initialValues: {
      description: '',
      amount: '',
      currency: '$ARS',
      date: '',
      type: '',
    },
    validationSchema: entryFormValidationSchema,
    onSubmit: (values) => {
      setLoading(true)
      const payload = {
        ...values,
        date: new Date(values.date),
      };
      
      axiosPrivate.post( endpointsV1.movements, payload)
      .then(_res => {
        addNotification(`Added new movement type of ${payload.type}`, 'success', 30000)
      })
      .catch(_err => {
        alert ('err')
      })
      .finally( () => {
        setLoading(false)
      })
      
    },
  });

  if (loading) return <Loading />;

  if (movementTypes.error) return <ErrorPage />;


  if (movementTypes.data)
    return (
      <>
        <form
          className="shadow-xl rounded-xl px-8 pt-6 pb-8 w-2/4 mt-20"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              {movementTypes.data.data.map((t: any) => {
                return (
                  <option key={t.id} value={t.type}>
                    {t.type}
                  </option>
                );
              })}
            </select>
            {formik.touched.currency && formik.errors.currency ? (
              <div className="text-red-300">{formik.errors.currency}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="salary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-300">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="amount">amount</label>
            <input
              id="amount"
              name="amount"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="number"
              placeholder="1500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="text-red-300">{formik.errors.amount}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="currency">currency</label>
            <select
              id="currency"
              name="currency"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currency}
            >
              <option value="$ARS">$ARS</option>
              <option value="$USD">$USD</option>
            </select>
            {formik.touched.currency && formik.errors.currency ? (
              <div className="text-red-300">{formik.errors.currency}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="date">date</label>
            <input
              id="date"
              name="date"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-300">{formik.errors.date}</div>
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
