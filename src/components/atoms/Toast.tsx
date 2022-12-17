// import node_modules
import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import classNames from 'classnames';

// import styles
import styles from './Toast.module.css';

// define types
export type ToastVariants = 'error' | 'info' | 'success' | 'warning';

export interface ToastProps {
  children: React.ReactNode;
  closeable?: boolean;
  duration?: number;
  handleClose: () => void;
  isOpen: boolean;
  variant?: ToastVariants;
}

// define components
export const Toast: React.FunctionComponent<ToastProps> = ({
  children,
  closeable = true,
  duration = 4000,
  handleClose,
  isOpen,
  variant = 'info',
}) => (
  <ToastPrimitive.Provider duration={duration}>
    <ToastPrimitive.Root
      className={classNames(styles['toast'], styles[variant])}
      onOpenChange={handleClose}
      open={isOpen}
    >
      <ToastPrimitive.Title className={classNames(styles['title'])}>
        {children}
      </ToastPrimitive.Title>

      {closeable && (
        <ToastPrimitive.Close className={styles['close']}>&#x2715;</ToastPrimitive.Close>
      )}
    </ToastPrimitive.Root>

    <ToastPrimitive.Viewport />
  </ToastPrimitive.Provider>
);

export default Toast;
