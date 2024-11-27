import { useParams } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { RpcNodes } from './RpcNodes/RpcNodes.jsx';
import { DangerZone } from './DangerZone/DangerZone.jsx';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { networkId } = useParams();
  const network = useStoreState(
    (store) => store.nearProtocol.networks.records[networkId],
    [networkId],
  );

  if (!network) return null;

  return (
    <div className={cn.settings}>
      <div className={cn.wrapper}>
        <HeadCard network={network} />
        <RpcNodes network={network} />
        <DangerZone network={network} />
      </div>
    </div>
  );
};
