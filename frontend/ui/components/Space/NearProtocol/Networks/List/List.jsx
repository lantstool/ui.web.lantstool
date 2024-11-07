import { Link } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import cn from './List.module.scss';

export const List = ({ ids }) => {
  const records = useStoreState((store) => store.nearProtocol.networks.records);
  return (
    <div className={cn.container}>
      {ids.map((networkId) => {
        // TODO move to separate component
        const network = records[networkId];
        return (
          <div key={network.networkId} className={cn.row}>
            <Link to={`../${networkId}`} relative="path">
              {networkId}
            </Link>
            <span>{network.activeRpc}</span>
            <span>{new Date(network.createdAt).toLocaleString()}</span>
            <Link to={`../${networkId}/settings`} relative="path">
              Settings
            </Link>
          </div>
        );
      })}
    </div>
  );
};
