import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactText } from 'react';
import Router from 'next/router';

interface NotifyReturn {
  errorNotify: (options: NotifyOptions) => ReactText;
  infoNotify: (options: NotifyOptions) => ReactText;
  successNotify: (options: NotifyOptions) => ReactText;
}

interface NotifyOptions {
  message: string;
  path?: string;
}

export function useNotify(): NotifyReturn {

  const errorNotify = ({ message, path }: NotifyOptions) => toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    onClose: () => path && Router.push(path),
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });

  const infoNotify = ({ message, path }: NotifyOptions) => toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    onClose: () => path && Router.push(path),
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#7e57c2'
    },
    theme: 'colored'
  });

  const successNotify = ({ message, path }: NotifyOptions) => toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    onClose: () => path && Router.push(path),
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });

  return {
    errorNotify,
    infoNotify,
    successNotify
  }
}