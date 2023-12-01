import React from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}

export const BaseButton = ({ children, className, bgColor = 'bg-stone-800', ...props }: IProps) => {
  // Apply the animation class when isShowButton is true

  return (
    <button
      {...props}
      disabled={props.disabled}
      className={`${className} ${bgColor}  flex items-center min-w-max justify-center text-white w-20 p-2 rounded-md disabled:bg-gray-400`}
    >
      {children}
    </button>
  );
};
