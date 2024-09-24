import { Link } from 'react-router-dom';
import cn from './List.module.scss';

export const List = ({ networks }) => {
  return (
    <div className={cn.container}>
      {networks.map((network) => (
        <div key={network.networkId} className={cn.row}>
          <Link to={`../${network.networkId}/transactions`} relative="path">
            {network.networkId}
          </Link>
          <span>{network.activeRpc}</span>
          <span>{new Date(network.createdAt).toLocaleString()}</span>
          <Link to={`../${network.networkId}/settings`} relative="path">
            Settings
          </Link>
        </div>
      ))}
    </div>
  );
};
