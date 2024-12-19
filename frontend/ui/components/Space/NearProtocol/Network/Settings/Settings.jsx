import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useParams } from 'react-router-dom';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { RpcNodes } from './RpcNodes/RpcNodes.jsx';
import { DangerZone } from './DangerZone/DangerZone.jsx';
import { useLoader } from '@hooks/useLoader.js';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId, networkId } = useParams();
  const network = useStoreState((store) => store.nearProtocol.networks.network);
  const getOne = useStoreEffect((store) => store.nearProtocol.networks.getOne);

  useSaveToHistory();

  const [isLoading] = useLoader(getOne, { spaceId, networkId }, [spaceId, networkId]);
  if (isLoading) return null;

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
