import { useParams } from 'react-router-dom';

export const useNetworkId = () => {
  const { networkId, spaceId } = useParams();

  return {
    spaceId,
    networkId,
    isMainnet: networkId === 'mainnet',
    isTestnet: networkId === 'testnet',
  };
};
