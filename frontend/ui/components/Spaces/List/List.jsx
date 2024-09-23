import { Link } from 'react-router-dom';
import cn from './List.module.scss';

export const List = ({ list }) => {
  return (
    <div className={cn.container}>
      {list.map((space) => (
        <div key={space.spaceId} className={cn.row}>
          <Link to={`/space/${space.spaceId}/select-blockchain`}>{space.name}</Link>
          <span>{space.type}</span>
          <span>{new Date(space.createdAt).toLocaleString()}</span>
          <Link to={`/space/${space.spaceId}/settings`}>Settings</Link>
        </div>
      ))}
    </div>
  );
};
