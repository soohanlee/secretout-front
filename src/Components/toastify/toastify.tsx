import { toast as toastFunction } from 'react-toastify';

export const toast = (text: string) => {
  return toastFunction(text, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
