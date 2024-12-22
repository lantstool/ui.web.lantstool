import { LinkItem } from './LinkItem/LinkItem.jsx';
import { TransactionFileBold } from '../../../../../_general/icons/TransactionFileBold.jsx';
import { CallsOutline } from '../../../../../_general/icons/CallsOutline.jsx';
import { AccountSquareOutline } from '../../../../../_general/icons/AccountSquareOutline.jsx';
import { KeySquareOutline } from '../../../../../_general/icons/KeySquareOutline.jsx';
import { ToolsLinear } from '../../../../../_general/icons/ToolsLinear.jsx';
import { NetworkOutline } from '../../../../../_general/icons/NetworkOutline.jsx';
import cn from './Navigation.module.scss';

export const Navigation = ({ isSidebarMinimized }) => (
  <div className={cn.navigation}>
    <LinkItem
      name="Transactions"
      Icon={TransactionFileBold}
      to="transactions"
      isSidebarMinimized={isSidebarMinimized}
    />
    <LinkItem name="Calls" Icon={CallsOutline} to="calls" isSidebarMinimized={isSidebarMinimized} />
    <LinkItem
      name="Accounts"
      Icon={AccountSquareOutline}
      to="accounts"
      isSidebarMinimized={isSidebarMinimized}
    />
    <LinkItem
      name="Keys"
      Icon={KeySquareOutline}
      to="keys"
      isSidebarMinimized={isSidebarMinimized}
    />
    <LinkItem name="Tools" Icon={ToolsLinear} to="tools" isSidebarMinimized={isSidebarMinimized} />
    <hr className={cn.divider} />
    <LinkItem
      name="Network Settings"
      Icon={NetworkOutline}
      to="settings"
      isSidebarMinimized={isSidebarMinimized}
    />
  </div>
);
