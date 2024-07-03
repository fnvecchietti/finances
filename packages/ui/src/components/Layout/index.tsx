import { ReactElement } from 'react';

const Layout = ({ children }: { children: ReactElement }) => {
  

  return (
    <main className='flex flex-col mt-20 items-center select-none'>
      {children}
    </main>
  );
};

export default Layout;
