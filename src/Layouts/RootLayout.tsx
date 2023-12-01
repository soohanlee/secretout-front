// import Bottom from '@Components/Bottom';
import Header from '@Components/Header';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  return (
    <div className='w-full max-w-5xl m-auto h-screen flex flex-col border overflow-hidden'>
      <Header />
      <div className='overflow-hidden h-full w-full relative p-6 flex flex-col justify-center'>
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
