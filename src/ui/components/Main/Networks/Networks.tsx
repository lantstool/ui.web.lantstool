import { useStoreEffect, useStoreState } from '../../../../react-vault';
import { useEffect } from 'react';
import { Network } from './Network/Network.tsx';
import { AddNetwork } from './AddNetwork/AddNetwork.tsx';

export const Networks = () => {
  const list: any = useStoreState((store: any) => store.networks.list);
  const map: any = useStoreState((store: any) => store.networks.map);
  const getNetworks = useStoreEffect((store: any) => store.networks.getNetworks);

  useEffect(() => {
    getNetworks();
  }, []);

  return (
    <div style={{ height: '95vh', overflow: 'scroll' }}>
      <h3>Networks</h3>
      {list.map((networkId: string) => (
        <Network key={networkId} network={map[networkId]} />
      ))}
      <AddNetwork />
    </div>
  );
};
