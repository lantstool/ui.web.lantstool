import { useEffect, useMemo, useState } from 'react';
import { useStoreAction, useStoreState } from '@react-vault';
import cnm from 'classnames';
import cn from './ToastMessage.module.scss';

const type = {
  black: { container: cn.black, icon: cn.infoIcon },
  success: { container: cn.success, icon: cn.successIcon },
  error: { container: cn.error, icon: cn.errorIcon },
  warning: { container: cn.warning, icon: cn.warningIcon },
};

const getType = (variant) => {
  return variant ? type[variant] : type['success'];
};

export const ToastMessage = () => {
  const notification = useStoreState((store) => store.notification);
  const setNotification = useStoreAction((store) => store.setNotification);
  const { isOpen, message, variant, delay } = notification;
  const { container, icon } = useMemo(() => getType(variant), [variant]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let displayTimeout; // animation open time 500 like at css
    let closeTimeout;
    const closeTime = 500 + delay; // 500 it is animation close time and delay it is message duration

    if (isOpen) {
      setIsAnimating(true);
      displayTimeout = setTimeout(() => {
        setIsAnimating(false);

        closeTimeout = setTimeout(() => {
          setNotification({ isOpen: false });
        }, 500);
      }, closeTime);
    }
    return () => {
      clearTimeout(displayTimeout);
      clearTimeout(closeTimeout);
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={cnm(container, isAnimating ? cn.start : cn.end)}>
      <span className={icon} />
      <h2 className={cn.title}>{message}</h2>
    </div>
  );
};
