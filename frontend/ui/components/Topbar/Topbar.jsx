import { SelectSpace } from './SelectSpace/SelectSpace.jsx';
import { SelectBlockchain } from './SelectBlockchain/SelectBlockchain.jsx';
import { SelectNearNetwork } from './SelectNearNetwork/SelectNearNetwork.jsx';
import { Link, useMatch } from 'react-router-dom';
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
        <Link
          className={cn.icon}
          target="_blank"
          rel="noopener noreferrer"
          to="https://x.com/lantstool"
        >
          <span className={cn.xIcon} />
        </Link>
        <SideMenu />
      </div>
    </div>
  );
};
