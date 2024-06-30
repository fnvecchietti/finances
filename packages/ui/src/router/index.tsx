import { useRoutes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../Pages/Home";
import Movements from "../Pages/Movements";
import Entry from "../Pages/Entry";
import Panel from "../Pages/Panel";
import Stocks from "../Pages/Stocks";
import { Register } from "../Pages/Register";
import { Login } from "../Pages/Login";
import NotFound from "../Pages/Notfound";


export const AppRoutes = () => {
    let routes = useRoutes([
      {
        path: '/',
        element: <PrivateRoute element={<Home />} />,
      },
      {
        path: '/movements',
        element: <PrivateRoute element={<Movements/>} />,
      },
      {
        path: '/entry',
        element: <PrivateRoute element={<Entry />} />,
      },
      {
        path: '/panel',
        element: <PrivateRoute element={<Panel />} />,
      },
      {
        path: '/stocks',
        element: <PrivateRoute element={<Stocks />} />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ]);
    return routes;
  };