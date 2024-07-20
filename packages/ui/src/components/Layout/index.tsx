import { ReactElement } from 'react';
import { AlertNotification } from '../common/AlertNotification';
import Navbar from '../common/Navbar';

const Layout = ({ children }: { children: ReactElement }) => {
  

  return (
    <div className='bg-white h-screen w-full'>
      <Navbar />
      <main className='flex flex-col items-center select-none'>
      <>
      <AlertNotification/>
      </>
      {children}
      </main>
    </div>
    
  );
};

export default Layout;
