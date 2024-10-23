import cn from './ToastMessage.module.scss';
import { useEffect, useMemo } from 'react';
import { InfoCircleLinear } from '../icons/InfoCircleLinear.jsx';
import { CheckCircleBold } from '../icons/CheckCircleBold.jsx';
import { ErrorCircleBold } from '../icons/ErrorCircleBold.jsx';
import { DangerWarningTriangleOutline } from '../icons/DangerWarningTriangleOutline.jsx';
import { useStoreAction, useStoreState } from '@react-vault';

const type = {
  black: { container: cn.black, icon: <InfoCircleLinear style={cn.icon} /> },
  success: { container: cn.success, icon: <CheckCircleBold style={cn.icon} /> },
  error: { container: cn.error, icon: <ErrorCircleBold style={cn.icon} /> },
  warning: { container: cn.warning, icon: <DangerWarningTriangleOutline style={cn.icon} /> },
};

const getType = (color) => {
  return color ? type[color] : type['success'];
};

export const ToastMessage = () => {
  const notification = useStoreState((store) => store.notification);
  const setNotification = useStoreAction((store) => store.setNotification);
  const { isOpen, message, color, daley } = notification;
  const { container, icon } = useMemo(() => getType(color), [color]);

  useEffect(() => {
    let timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        setNotification({ isOpen: false });
      }, daley);
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={container} style={{ animationDuration: `${daley}ms` }}>
      {icon}
      <h2 className={cn.title}>{message}</h2>
    </div>
  );
};
