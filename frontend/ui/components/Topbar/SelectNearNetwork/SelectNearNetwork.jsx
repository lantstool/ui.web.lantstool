import { useMemo } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../react-vault/index.js';
import { useLoader } from '../../../hooks/useLoader.js';
import { useGetOptions } from './useGetOptions.jsx';
import cn from './SelectNearNetwork.module.scss';

export const SelectNearNetwork = () => {
  const { spaceId, networkId } = useParams();
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const options = useGetOptions(spaceId, networkId);
  const navigate = useNavigate();

  const [isLoading] = useLoader(getAll, { spaceId }, [spaceId]);
  const match = useMatch('/space/:spaceId/near-protocol/*');
  // We also want to hide select when user go to '/near-protocol/networks' - we use networkId for that
  if (isLoading || !match || !networkId) return null;

  const onChange = (event) => {
    navigate(`/space/${spaceId}/near-protocol/${event.target.value}`);
  };

  return (
    <select value={networkId} onChange={onChange} className={cn.selectNearNetwork}>
      {options}
      <option value="networks">Manage Networks</option>
    </select>
  );
};
