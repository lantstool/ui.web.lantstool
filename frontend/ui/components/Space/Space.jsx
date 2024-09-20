import { Outlet, useParams } from 'react-router-dom';

export const Space = () => {
  const { spaceId } = useParams();

  return (
    <div>
      <span>{spaceId}</span>
      <button>Avc</button>
      <Outlet />
    </div>
  );
};
