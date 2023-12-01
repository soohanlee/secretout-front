import React from 'react';
import { BaseButton } from './BaseButton';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const FadeButton = ({ children, className, ...props }: IProps) => {
  // Apply the animation class when isShowButton is true

  return (
    <BaseButton className={`animate-fadeIn ${className}`} {...props}>
      {children}
    </BaseButton>
  );
};
