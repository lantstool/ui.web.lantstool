import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault/index.js';
import { useLoader } from '../../../hooks/useLoader.js';
import cn from './SelectSpace.module.scss';
import { Selector } from '../_general/Selector/Selector.jsx';

const getOptions = (ids, records) =>
  ids.map((spaceId) => ({
    label: records[spaceId].name,
    value: records[spaceId].name,
    spaceId: records[spaceId].spaceId,
  }));

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
  const onChange = (option) => {
    if (option.value === 'manageSpaces') return navigate(`/spaces`);
    navigate(`/space/${option.spaceId}`);
  };

  const defaultValue = options.find((option) => option.spaceId === spaceId);

  return (
    <div className={cn.selectSpace}>
      <Selector
        onChange={onChange}
        defaultValue={defaultValue}
        options={[...options, { label: 'Manage Spaces', value: 'manageSpaces' }]}
      />
    </div>
  );
};