import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../react-vault/index.js';
import { useLoader } from '../../../hooks/useLoader.js';
import { Selector } from '../_general/Selector/Selector.jsx';
import { useNetworkOptions } from './useNetworkOptions.jsx';
import cn from './SelectNearNetwork.module.scss';

export const SelectNearNetwork = () => {
  const { spaceId, networkId } = useParams();
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const { options, defaultValue } = useNetworkOptions(networkId);
  const navigate = useNavigate();
  const [isLoading] = useLoader(getAll, { spaceId }, [spaceId]);
  const match = useMatch('/space/:spaceId/near-protocol/*');
  // We also want to hide select when user go to '/near-protocol/networks' - we use networkId for that
  if (isLoading || !match || !networkId) return null;

  const onChange = (event) => {
    navigate(`/space/${spaceId}/near-protocol/${event.value}`);
  };

  return (
    <div className={cn.selectNearNetwork}>
      <Selector onChange={onChange} defaultValue={defaultValue} options={options} />
    </div>
  );
};
