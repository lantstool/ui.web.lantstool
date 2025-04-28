import { format } from 'date-fns';
import cnm from 'classnames';
import cn from './Log.module.scss';

export const Log = ({ log }) => {
  const time = format(log.timestamp, 'HH:mm:ss');

  const extraClasses = {
    [cn.errorText]: log.type === 'error',
    [cn.successText]: log.type === 'success',
  };

  return (
    <div className={cn.log}>
      <span className={cnm(cn.time, extraClasses)}>{time}</span>
      <span className={cnm(cn.message, extraClasses)}>{log.message}</span>
    </div>
  );
};
