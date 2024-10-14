import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../react-vault/index.js';
import { useLoader } from '../../../hooks/useLoader.js';
import { Selector } from '../_general/Selector/Selector.jsx';
import { useSpaceOptions } from './useSpaceOptions.jsx';
import cn from './SelectSpace.module.scss';

export const SelectSpace = () => {
  const { spaceId } = useParams();
  const getAll = useStoreEffect((store) => store.spaces.getAll);
  const navigate = useNavigate();
  const [isLoading] = useLoader(getAll);
  const { options, defaultValue } = useSpaceOptions(spaceId);
  const match = useMatch('/space/:spaceId/*');

  if (isLoading || !match) return null;

  const onChange = (option) => {
    if (option.value === 'manageSpaces') return navigate(`/spaces`);
    navigate(`/space/${option.value}`);
  };

  return (
    <div className={cn.selectSpace}>
      <Selector onChange={onChange} defaultValue={defaultValue} options={options} />
    </div>
  );
};
