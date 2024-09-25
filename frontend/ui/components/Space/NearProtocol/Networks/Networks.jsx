import { Link, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../../react-vault/index.js';
import { useLoader } from '../../../../hooks/useLoader.js';
import { Empty } from './Empty/Empty.jsx';
import { List } from './List/List.jsx';
import cn from './Networks.module.scss';

export const Networks = () => {
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const { spaceId } = useParams();
  const [isLoading, networks] = useLoader(getAll, spaceId);

  if (isLoading) return null;
  if (networks.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <h1>Networks</h1>
      <List networks={networks} />
      <Link to="create">Create Network</Link>
    </div>
  );
};
