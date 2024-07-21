import { createContext, useContext, useEffect, useState } from 'react';
import { useAxiosPrivate } from '../hooks/usePrivateAxios';
import { endpointsV1 } from '../environent/api-config';

export const NotificationContext = createContext<any>({});

interface Notification {
  id: number;
  message: string;
  severity: 'info' | 'critical' | 'success' | 'warning';
}
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  };

  const addNotification = (
    message: string,
    severity: 'info' | 'critical' | 'success' | 'warning',
    duration = 5000,
  ) => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, severity }]);

    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const AuthContext = createContext<any>({});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  const setTokenWithStorage = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setTokenWithStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const FinancesContext = createContext<any>({});

export const FinancesProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { token } = useContext(AuthContext);
  const [movements, setMovements] = useState({});
  const [stocks, setStocks] = useState({});
  const [stocksBalance, setStocksBalance] = useState({});
  const [wallets, setWallets] = useState({});
  const [selectedWallet, setSelectedWallet] = useState();

  useEffect(() => {
    axiosPrivate
      .get(endpointsV1.wallet)
      .then((res) => {
        setWallets(res.data);
      })
      .catch((err) => console.log);
  }, [token]);
  
  return (
    <FinancesContext.Provider
      value={{
        movements,
        setMovements,
        stocks,
        setStocks,
        wallets,
        setWallets,
        stocksBalance,
        setStocksBalance,
        selectedWallet,
        setSelectedWallet,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};
