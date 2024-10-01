import { Link, useParams } from 'react-router-dom';
import {
  useStoreEffect,
  useStoreState,
} from '../../../../../../react-vault/index.js';
import { useLoader } from '../../../../hooks/useLoader.js';
import { Empty } from './Empty/Empty.jsx';
import { List } from './List/List.jsx';
import cn from './Networks.module.scss';

export const Networks = () => {
  const { spaceId } = useParams();
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);
  const [isLoading] = useLoader(getAll, { spaceId });

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <h1>Networks</h1>
      <List ids={ids}/>
      <Link to="create">Create Network</Link>
    </div>
  );
};
