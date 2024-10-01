import {
  matchPath,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
  useLocation,
  Link,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import cn from './Transactions.module.css';

const getDestination = (navHistory, startPath) => {
  const nextRoute = get(navHistory, [...startPath, 'next']);
  return nextRoute ? getDestination(navHistory, [...startPath, nextRoute]) : startPath;
};

const handleNavigate = (location, navHistory, navigate) => {
  const match = matchPath(
    '/space/:spaceId/near-protocol/:networkId/transactions',
    location.pathname,
  );
  if (!match) return;

  const { spaceId, networkId } = match.params;
  const startPath = ['', 'space', spaceId, 'near-protocol', networkId, 'transactions']

  if (!get(navHistory, [...startPath, 'next'])) {
    // save to history
    return;
  }

  const destination = getDestination(navHistory, startPath);
  navigate(destination.join('/'));
  console.log('route', destination.join('/'));
};

export const Transactions = ({ navHistory }) => {
  const [isInit, setIsInit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    handleNavigate(location, navHistory, navigate);
    setIsInit(true);
  }, [location]);

  if (!isInit) return null;

  return (
    <div className={cn.container}>
      <div className={cn.sidebar}>
        <Link to="./1">Transaction #1</Link>
        <Link to="./2">Transaction #2</Link>
        <Link to="./3">Transaction #3</Link>
      </div>
      <Outlet />
    </div>
  );
};
