import { SelectSpace } from './SelectSpace/SelectSpace.jsx';
import { SelectBlockchain } from './SelectBlockchain/SelectBlockchain.jsx';
import { SelectNearNetwork } from './SelectNearNetwork/SelectNearNetwork.jsx';
import { Link, useMatch } from 'react-router-dom';
import { SideMenu } from './SideMenu/SideMenu.jsx';
import { Button } from '../_general/Button/Button.jsx';
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
          target="_blank"
          rel="noopener noreferrer"
          to="https://github.com/lantstool/ui.web.lantstool"
        >
          <Button color="tertiary" size="small" iconLeftStyles={cn.githubIcon} />
        </Link>
        <SideMenu />
      </div>
    </div>
  );
};
