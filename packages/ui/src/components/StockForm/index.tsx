import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import { endpointsV1 } from '../../environent/api-config';
import { useAxiosPrivate } from '../../hooks/usePrivateAxios';


const stockFormEntryValidation = object({
    name: string().required(),
    ticker: string().required(),
    quantity: number().required(),
    purchase_price: number().required(),
    current_price: number().required(),
    ratio: number().required(),
    purchase_date: date().required(),
    currency: string().required()
});

export const StockForm = () => {

  const axiosPrivate = useAxiosPrivate();

  const formik = useFormik({
    initialValues: {
      name: '',
      ticker: '',
      quantity: '',
      purchase_price: '',
      current_price: '',
      ratio: '',
      purchase_date: '',
      currency: '$ARS'
    },
    validationSchema: stockFormEntryValidation,
    onSubmit: (values) => {
      const payload = {
        ...values,
      }

      axiosPrivate.post(endpointsV1.stocks, payload)
      .then(_ => {
        alert('success')
      })
      .catch(_ => {
        alert('err')
      })

    },
  });


    return (
      <>
        <form
          className="shadow-xl rounded-xl px-8 pt-6 pb-8 w-2/4 mt-20"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="Amazon Inc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-300">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="ticker">Ticker</label>
            <input
              id="ticker"
              name="ticker"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="text"
              placeholder="AMZN"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ticker}
            />
            {formik.touched.ticker && formik.errors.ticker ? (
              <div className="text-red-300">{formik.errors.ticker}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="number"
              placeholder="1500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-red-300">{formik.errors.quantity}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="purchase_price">Purchase price</label>
            <input
              id="purchase_price"
              name="purchase_price"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="number"
              placeholder="200"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.purchase_price}
            />
            {formik.touched.purchase_price && formik.errors.purchase_price ? (
              <div className="text-red-300">{formik.errors.purchase_price}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="current_price">Current price</label>
            <input
              id="current_price"
              name="current_price"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="number"
              placeholder="2000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.current_price}
            />
            {formik.touched.current_price && formik.errors.current_price ? (
              <div className="text-red-300">{formik.errors.current_price}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="ratio">Ratio</label>
            <input
              id="ratio"
              name="ratio"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="number"
              placeholder="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ratio}
            />
            {formik.touched.ratio && formik.errors.ratio ? (
              <div className="text-red-300">{formik.errors.ratio}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="purchase_date">Purchase date</label>
            <input
              id="purchase_date"
              name="purchase_date"
              className="flex w-full h-10 p-2 outline-none bg-gray-100 border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.purchase_date.toString()}
            />
            {formik.touched.purchase_date && formik.errors.purchase_date ? (
              <div className="text-red-300">{`${formik.errors.purchase_date}`}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="currency">Currency</label>
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
          <button
            className="flex w-full h-10 p-2 outline-none bg-black text-white border-solid rounded-lg place-content-center font-medium duration-100 ease-in hover:bg-white hover:border-black hover:text-black hover:border-2"
            type="submit"
          >
            Create
          </button>
        </form>
      </>
    );
};
