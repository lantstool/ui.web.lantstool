import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../react-vault/index.js';
import { useLoader } from '../../../hooks/useLoader.js';
import cn from './SelectSpace.module.scss';
import { Selector } from '../_general/Selector/Selector.jsx';
import { useSpaceOptions } from './useSpaceOptions.jsx';

const getDefaultValue = (options, spaceId) => options.find((option) => option.spaceId === spaceId);

export const SelectSpace = () => {
  const { spaceId } = useParams();
  const getAll = useStoreEffect((store) => store.spaces.getAll);
  const navigate = useNavigate();
  const [isLoading] = useLoader(getAll);
  const match = useMatch('/space/:spaceId/*');
  const options = useSpaceOptions();
  const defaultValue = getDefaultValue(options, spaceId);

  if (isLoading || !match) return null;

  const onChange = (option) => {
    if (option.value === 'manageSpaces') return navigate(`/spaces`);
    navigate(`/space/${option.spaceId}`);
  };

  return (
    <div className={cn.selectSpace}>
      <Selector onChange={onChange} defaultValue={defaultValue} options={options} />
    </div>
  );
};
