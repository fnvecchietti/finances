import { useRoutes, BrowserRouter } from 'react-router-dom';
import Home from '../Home/index.tsx';
import Movements from '../Movements/index.tsx';
import NotFound from '../Notfound/index.tsx';
import Navbar from '../../components/Navbar/index.tsx';
import Layout from '../../components/Layout/index.tsx';
import Entry from '../Entry/index.tsx';
import { FinancesProvider } from '../../context/index.tsx';
import Panel from '../Panel/index.tsx';
import Stocks from '../Stocks/index.tsx';
import { Register } from '../Register/index.tsx';
import { Login } from '../Login/index.tsx';
const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/movements',
      element: <Movements />,
    },
    {
      path: '/entry',
      element: <Entry />,
    },
    {
      path: '/panel',
      element: <Panel/>,
    },
    {
      path: '/stocks',
      element: <Stocks/>,
    },
    {
      path: '/register',
      element: <Register/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/*',
      element: <NotFound />,
    },
  ]);
  return routes;
};

const App = () => {
  return (
    <FinancesProvider>
      <BrowserRouter>
        <Navbar />
          <Layout>
            <AppRoutes />
          </Layout>
      </BrowserRouter>
    </FinancesProvider>
  );
};

export default App;