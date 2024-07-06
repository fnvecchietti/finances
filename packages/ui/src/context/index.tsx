import { createContext, useState } from 'react';


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

  const removeNotification = (id:number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const addNotification = (
    message: string,
    severity: 'info' | 'critical' | 'success' | 'warning',
    duration = 5000
  ) => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, severity }]);

    setTimeout(() => {
        removeNotification(id);
      }, duration);
  };

  return (
    <NotificationContext.Provider value={{notifications, addNotification, removeNotification}}>
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
