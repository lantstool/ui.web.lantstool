import { useMatch, useNavigate } from 'react-router-dom';
import cn from './SelectBlockchain.module.scss';
import { Selector } from '../_general/Selector/Selector.jsx';

export const SelectBlockchain = () => {
  const navigate = useNavigate();
  const match = useMatch('/space/:spaceId/:segment/*');

  if (!match) return null;

  const { spaceId, segment } = match.params;
  if (segment === 'select-blockchain' || segment === 'settings') return null;

  const changeBlockchain = (event) => {
    navigate(`space/${spaceId}/${event.value}`);
  };

  return (
    <div className={cn.selectBlockchain}>
      <Selector
        onChange={changeBlockchain}
        defaultValue={{ label: 'Near Protocol', value: 'near-protocol' }}
      />
    </div>
  );
};
