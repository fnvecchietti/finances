import { ReactElement } from 'react';
import { AlertNotification } from '../AlertNotification';

const Layout = ({ children }: { children: ReactElement }) => {
  

  return (
    <main className='flex flex-col mt-20 items-center select-none'>
      <>
      <AlertNotification/>
      </>
      {children}
    </main>
  );
};

export default Layout;
