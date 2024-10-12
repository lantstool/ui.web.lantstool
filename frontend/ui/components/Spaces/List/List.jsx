import { Link } from 'react-router-dom';
import { useStoreState } from '../../../../../react-vault/index.js';
import cn from './List.module.scss';

export const List = ({ ids }) => {
  const records = useStoreState((store) => store.spaces.records);

  return (
    <div className={cn.container}>
      {ids.map((spaceId) => {
        const { name, type, createdAt } = records[spaceId];
        return (
          <div key={spaceId} className={cn.row}>
            <Link to={`/space/${spaceId}`}>{name}</Link>
            <span>{type}</span>
            <span>{new Date(createdAt).toLocaleString()}</span>
            <Link to={`/space/${spaceId}/settings`}>Settings</Link>
          </div>
        );
      })}
    </div>
  );
};
