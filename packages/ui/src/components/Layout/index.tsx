import { ReactElement } from 'react';

const Layout = ({ children }: { children: ReactElement }) => {
  

  return (
    <div className='flex flex-col mt-20 items-center select-none'>
      {children}
    </div>
  );
};

export default Layout;
