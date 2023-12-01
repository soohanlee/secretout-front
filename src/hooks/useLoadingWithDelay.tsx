import { delayTime } from '@Api/client';
import { useState, useEffect } from 'react';

interface IProps {
  isLoading: boolean;
  delay?: number;
}

const useLoadingWithDelay = ({ isLoading, delay = delayTime }: IProps) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setShowLoading(true);
    } else if (!isLoading && showLoading) {
      timeout = setTimeout(() => {
        setShowLoading(false);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, delay]);

  return showLoading;
};

export default useLoadingWithDelay;
