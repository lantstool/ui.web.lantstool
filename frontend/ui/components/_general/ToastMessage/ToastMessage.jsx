import { useEffect, useMemo } from 'react';
import { InfoCircleLinear } from '../icons/InfoCircleLinear.jsx';
import { CheckCircleBold } from '../icons/CheckCircleBold.jsx';
import { ErrorCircleBold } from '../icons/ErrorCircleBold.jsx';
import { DangerWarningTriangleOutline } from '../icons/DangerWarningTriangleOutline.jsx';
import { useStoreAction, useStoreState } from '@react-vault';
import cn from './ToastMessage.module.scss';

const type = {
  black: { container: cn.black, icon: <InfoCircleLinear style={cn.icon} /> },
  success: { container: cn.success, icon: <CheckCircleBold style={cn.icon} /> },
  error: { container: cn.error, icon: <ErrorCircleBold style={cn.icon} /> },
  warning: { container: cn.warning, icon: <DangerWarningTriangleOutline style={cn.icon} /> },
};

const getType = (variant) => {
  return variant ? type[variant] : type['success'];
};

export const ToastMessage = () => {
  const notification = useStoreState((store) => store.notification);
  const setNotification = useStoreAction((store) => store.setNotification);
  const { isOpen, message, variant, delay } = notification;
  const { container, icon } = useMemo(() => getType(variant), [variant]);

  useEffect(() => {
    let timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        setNotification({ isOpen: false });
      }, delay);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={container} style={{ animationDuration: `${delay}ms` }}>
      {icon}
      <h2 className={cn.title}>{message}</h2>
    </div>
  );
};
