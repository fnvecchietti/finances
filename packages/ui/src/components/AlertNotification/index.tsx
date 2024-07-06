import { useNotification } from '../../hooks/useNotifications';

interface Notification {
  id: number;
  message: string;
  severity: 'info' | 'critical' | 'success' | 'warning';
}
export const AlertNotification = () => {
  const { notifications, removeNotification } = useNotification();

  const mapToSeverity = {
    info: 'bg-blue-600',
    critical: 'bg-red-600',
    success: 'bg-green-300',
    warning: 'bg-yellow-300',
  };

  const close = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    
    );
  };

  return (
    <div className="fixed bottom-10 left-1/2">
      {notifications.map((notification: Notification) => {
        return (
          <div
            key={notification.id}
            className={`${
              mapToSeverity[notification.severity]
            } min-w-72 min-h-12 rounded-lg flex justify-center items-center`}
          >
            {notification.message}
            <button onClick={() => removeNotification(notification.id)}>
              {close()}
            </button>
          </div>
        );
      })}
    </div>
  );
};
