import { useStoreEffect, useStoreState } from '../../../../../react-vault/index.js';
import { useEffect } from 'react';
import { Network } from './Network/Network.jsx';
import { AddNetwork } from './AddNetwork/AddNetwork.jsx';

export const Networks = () => {
  const list = useStoreState((store) => store.networks.list);
  const map = useStoreState((store) => store.networks.map);
  const getNetworks = useStoreEffect((store) => store.networks.getNetworks);

  useEffect(() => {
    getNetworks();
  }, []);

  return (
    <div style={{ height: '95vh', overflow: 'scroll' }}>
      <h3>Networks</h3>
      {list.map((networkId) => (
        <Network key={networkId} network={map[networkId]} />
      ))}
      <AddNetwork />
    </div>
  );
};
