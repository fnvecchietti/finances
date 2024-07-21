import { BrowserRouter } from 'react-router-dom';
import {
  AuthProvider,
  FinancesProvider,
  NotificationProvider,
} from '../../context/index.tsx';
import { AppRoutes } from '../../router/index.tsx';
import Layout from '../../components/Layout/index.tsx';

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <FinancesProvider>
          <BrowserRouter>
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </FinancesProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
