import { Outlet, useParams } from 'react-router-dom';

export const Network = () => {
  const { networkId } = useParams();

  return (
    <div>
      <span>{networkId}</span>
      <Outlet />
    </div>
  );
};
