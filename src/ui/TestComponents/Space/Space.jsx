import { Outlet, useLocation, useParams, matchPath, useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { useEffect, useState } from 'react';

const getDestination = (navHistory, startPath) => {
  const nextRoute = get(navHistory, [...startPath, 'next']);
  return nextRoute ? getDestination(navHistory, [...startPath, nextRoute]) : startPath;
};

const handleNavigate = (location, navHistory, navigate) => {
  const match = matchPath('/space/:spaceId', location.pathname);
  if (!match) return;

  const { spaceId } = match.params;

  if (!get(navHistory, ['', 'space', spaceId, 'next'])) {
    return navigate('/page-not-found');
  }

  const path = getDestination(navHistory, ['', 'space', spaceId]);
  navigate(path.join('/'));
  console.log('route', path.join('/'));
};

export const Space = ({ navHistory }) => {
  const { spaceId } = useParams();
  const [isInit, setIsInit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    handleNavigate(location, navHistory, navigate);
    setIsInit(true);
  }, [location]);

  if (!isInit) return null;

  return <Outlet />;
};
