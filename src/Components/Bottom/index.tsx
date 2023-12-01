import React from 'react';

interface IBottomComponentProps {
  children: React.ReactNode;
}

const BottomComponent = ({ children }: IBottomComponentProps) => {
  return (
    <div className='absolute bottom-0 left-0 p-3 right-0 w-full'>
      <div className='flex'>{children}</div>
    </div>
  );
};

export default BottomComponent;
