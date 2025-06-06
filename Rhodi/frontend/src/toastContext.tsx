// src/context/ToastContext.tsx

import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const ToastContext = createContext<any>(null);

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const notifySuccess = (message: string) => {
    toast.success(message);  
  };

  const notifyError = (message: string) => {
    toast.error(message); 
  };

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError }}>
      {children}  
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
