import { SelectSpace } from './SelectSpace/SelectSpace.jsx';
import { SelectBlockchain } from './SelectBlockchain/SelectBlockchain.jsx';
import { SelectNearNetwork } from './SelectNearNetwork/SelectNearNetwork.jsx';
import { useMatch } from 'react-router-dom';
import { SideMenu } from './SideMenu/SideMenu.jsx';
import cn from './Topbar.module.scss';

export const Topbar = () => {
  const spaceMatch = useMatch('/space/:spaceId/*');

  return (
    <div className={cn.topbar}>
      <div className={spaceMatch ? cn.borderedWrapper : cn.wrapper}>
        <SelectSpace />
        <SelectBlockchain />
        <SelectNearNetwork />
      </div>
      <div className={cn.menu}>
        <SideMenu />
      </div>
    </div>
  );
};
