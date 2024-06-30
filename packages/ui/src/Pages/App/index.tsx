import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, FinancesProvider } from '../../context/index.tsx';
import { AppRoutes } from '../../router/index.tsx';
import Navbar from '../../components/Navbar/index.tsx';
import Layout from '../../components/Layout/index.tsx';

const App = () => {
  return (
    <AuthProvider>
      <FinancesProvider>
        <BrowserRouter>
          <Navbar />
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </FinancesProvider>
    </AuthProvider>
  );
};

export default App;
