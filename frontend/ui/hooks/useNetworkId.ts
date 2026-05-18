import { useParams } from 'react-router-dom';

interface NetworkContext {
  spaceId: string | undefined;
  networkId: string | undefined;
  isMainnet: boolean;
  isTestnet: boolean;
}

export const useNetworkId = (): NetworkContext => {
  const { networkId, spaceId } = useParams<'networkId' | 'spaceId'>();

  return {
    spaceId,
    networkId,
    isMainnet: networkId === 'mainnet',
    isTestnet: networkId === 'testnet',
  };
};
