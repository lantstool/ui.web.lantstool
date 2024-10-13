import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault/index.js';
import { useLoader } from '../../../hooks/useLoader.js';
import { Selector } from '../_general/Selector/Selector.jsx';

const getOptions = (ids) =>
  ids.map((networkId) => ({
    label: networkId,
    value: networkId,
    networkId: networkId,
  }));

export const SelectNearNetwork = () => {
  const { spaceId, networkId } = useParams();
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);
  const options = getOptions(ids, spaceId, networkId);
  // const options = useGetOptions(spaceId, networkId);
  const navigate = useNavigate();

  const [isLoading] = useLoader(getAll, { spaceId }, [spaceId]);
  const match = useMatch('/space/:spaceId/near-protocol/*');
  // We also want to hide select when user go to '/near-protocol/networks' - we use networkId for that
  if (isLoading || !match || !networkId) return null;

  const onChange = (event) => {
    navigate(`/space/${spaceId}/near-protocol/${event.networkId}`);
  };

  const value = options.find((option) => option.networkId === networkId);

  return (
    <Selector
      onChange={onChange}
      defaultValue={value}
      options={[...options, { label: 'Manage Networks', value: 'networks', networkId: 'networks' }]}
    />
  );
};
