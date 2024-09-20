import { matchPath, Outlet, useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import cn from './Network.module.css';

const getDestination = (navHistory, startPath) => {
  const nextRoute = get(navHistory, [...startPath, 'next']);
  return nextRoute ? getDestination(navHistory, [...startPath, nextRoute]) : startPath;
};

const handleNavigate = (location, navHistory, navigate) => {
  const match = matchPath('/space/:spaceId/near-protocol/:networkId', location.pathname);
  if (!match) return;

  const { spaceId, networkId } = match.params;

  if (!get(navHistory, ['', 'space', spaceId, 'near-protocol', networkId, 'next'])) {
    return navigate('/page-not-found');
  }

  const path = getDestination(navHistory, ['', 'space', spaceId, 'near-protocol', networkId]);
  navigate(path.join('/'));
  console.log('route', path.join('/'));
};

export const Network = ({ navHistory }) => {
  const { networkId } = useParams();
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
        <Link to="./transactions">Transactions</Link>
        <Link to="./calls">Calls</Link>
      </div>
      <Outlet />
    </div>
  );
};
