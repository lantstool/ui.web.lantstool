import { Outlet, useLocation, useNavigate, matchPath } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DropdownRedirect } from './DropdownRedirect/DropdownRedirect.jsx';
import { get } from 'lodash';

const getDestination = (navHistory, startPath) => {
  const nextRoute = get(navHistory, [...startPath, 'next']);
  return nextRoute ? getDestination(navHistory, [...startPath, nextRoute]) : startPath;
};

const handleNavigateToRoot = (location, navHistory, navigate) => {
  const match = matchPath('/', location.pathname);
  if (!match) return;

  if (!navHistory[''].next) {
    navigate('/get-started');
  }

  const path = getDestination(navHistory, ['']);
  navigate(path.join('/'));
  console.log('route', path.join('/'));
}


export const TestApp = ({ navHistory }) => {
  const [isInit, setIsInit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    handleNavigateToRoot(location, navHistory, navigate);
    setIsInit(true);
  }, [location]);

  if (!isInit) return null;

  return (
    <div>
      <DropdownRedirect />
      <Outlet />
    </div>
  );
};
