import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import cn from './Calls.module.css';

const getDestination = (navHistory, startPath) => {
  const nextRoute = get(navHistory, [...startPath, 'next']);
  return nextRoute ? getDestination(navHistory, [...startPath, nextRoute]) : startPath;
};

const handleNavigate = (location, navHistory, navigate) => {
  const match = matchPath('/space/:spaceId/near-protocol/:networkId/calls', location.pathname);
  if (!match) return;

  const { spaceId, networkId } = match.params;
  const startPath = ['', 'space', spaceId, 'near-protocol', networkId, 'calls'];

  if (!get(navHistory, [...startPath, 'next'])) {
    // save to history
    return;
  }

  const destination = getDestination(navHistory, startPath);
  navigate(destination.join('/'));
  console.log('route', destination.join('/'));
};

export const Calls = ({ navHistory }) => {
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
        <Link to="./1c">Call #1c</Link>
        <Link to="./2c">Call #2c</Link>
        <Link to="./3c">Call #3c</Link>
      </div>
      <Outlet />
    </div>
  );
};
