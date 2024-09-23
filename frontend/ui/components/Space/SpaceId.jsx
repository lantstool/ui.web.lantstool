import { Outlet, useParams } from 'react-router-dom';

export const SpaceId = () => {
  const { spaceId } = useParams();
  return <Outlet />;
};
