import { useMatch, useNavigate } from 'react-router-dom';
import cn from './SelectBlockchain.module.scss';

export const SelectBlockchain = () => {
  const navigate = useNavigate();
  const match = useMatch('/space/:spaceId/:segment/*');

  if (!match) return null;

  const { spaceId, segment } = match.params;
  if (segment === 'select-blockchain' || segment === 'settings') return null;

  const changeBlockchain = (event) => {
    navigate(`space/${spaceId}/${event.target.value}`);
  };

  return (
    <select value={segment} onChange={changeBlockchain} className={cn.selectBlockchain}>
      <option value="near-protocol">Near Protocol</option>
    </select>
  );
};
