import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault/index.js';
import { useLoader } from '../../../hooks/useLoader.js';
import cn from './SelectSpace.module.scss';

const getOptions = (ids, records) =>
  ids.map((spaceId) => (
    <option value={spaceId} key={spaceId}>
      {records[spaceId].name}
    </option>
  ));

export const SelectSpace = () => {
  const { spaceId } = useParams();
  const ids = useStoreState((store) => store.spaces.ids);
  const records = useStoreState((store) => store.spaces.records);
  const getAll = useStoreEffect((store) => store.spaces.getAll);
  const navigate = useNavigate();

  const [isLoading] = useLoader(getAll);

  const match = useMatch('/space/:spaceId/*');
  if (isLoading || !match) return null;

  const options = getOptions(ids, records);

  const onChange = (event) => {
    if (event.target.value === 'manageSpaces') return navigate(`/spaces`);
    navigate(`/space/${event.target.value}`);
  };

  return (
    <select value={spaceId} onChange={onChange} className={cn.selectSpace}>
      {options}
      <option value="manageSpaces">Manage Spaces</option>
    </select>
  );
};
