import { useParams } from 'react-router-dom';

export const SolanaNetwork = ({ navHistory }) => {
  const { networkId } = useParams();
  return (
    <div>
      <div>Network {networkId}</div>
    </div>
  );
};

