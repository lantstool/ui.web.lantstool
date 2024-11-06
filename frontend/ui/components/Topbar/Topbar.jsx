import { SelectSpace } from './SelectSpace/SelectSpace.jsx';
import { SelectBlockchain } from './SelectBlockchain/SelectBlockchain.jsx';
import { SelectNearNetwork } from './SelectNearNetwork/SelectNearNetwork.jsx';
import { useMatch } from 'react-router-dom';
import cn from './Topbar.module.scss';

export const Topbar = () => {
  const match = useMatch('/space/:spaceId/*');

  return (
    <div className={cn.topbar}>
      <div className={match ? cn.borderedWrapper : cn.wrapper}>
        <SelectSpace />
        <SelectBlockchain />
        <SelectNearNetwork />
      </div>
      <div className={cn.buttonWrapper}></div>
    </div>
  );
};
