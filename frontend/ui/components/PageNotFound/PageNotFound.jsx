import { Link, useLocation } from 'react-router-dom';
import cn from './PageNotFound.module.scss';

export const PageNotFound = () => {
  const location = useLocation();
  const { message } = location.state || { message: `Page ${location.pathname} not found` };

  return (
    <div className={cn.pageNotFound}>
      <div className={cn.wrapper}>
        <p>{message}</p>
        <Link to="/" replace>
          Got it!
        </Link>
      </div>
    </div>
  );
};
