import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, NotificationProvider } from '../../context/index.tsx';
import { AppRoutes } from '../../router/index.tsx';
import Layout from '../../components/Layout/index.tsx';

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
