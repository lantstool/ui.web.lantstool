import { useParams } from 'react-router-dom';

export const useNetworkId = () => {
  const { networkId } = useParams();

  return {
    networkId,
    isMainnet: networkId === 'mainnet',
    isTestnet: networkId === 'testnet',
  };
};
