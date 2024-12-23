import { LinkItem } from './LinkItem/LinkItem.jsx';
import cn from './Navigation.module.scss';

export const Navigation = ({ isSidebarMinimized }) => (
  <div className={cn.navigation}>
    <LinkItem
      name="Transactions"
      icon={cn.transactions}
      activeIcon={cn.transactionsActive}
      to="transactions"
      isSidebarMinimized={isSidebarMinimized}
    />
    <LinkItem
      name="Calls"
      icon={cn.calls}
      activeIcon={cn.callsActive}
      to="calls"
      isSidebarMinimized={isSidebarMinimized}
    />
    <LinkItem
      name="Accounts"
      icon={cn.accounts}
      activeIcon={cn.accountsActive}
      to="accounts"
      isSidebarMinimized={isSidebarMinimized}
    />
    <LinkItem
      name="Keys"
      icon={cn.keys}
      activeIcon={cn.keysActive}
      to="keys"
      isSidebarMinimized={isSidebarMinimized}
    />
    <LinkItem
      name="Utilities"
      icon={cn.utilities}
      activeIcon={cn.utilitiesActive}
      to="tools"
      isSidebarMinimized={isSidebarMinimized}
    />
    <hr className={cn.divider} />
    <LinkItem
      name="Network Settings"
      icon={cn.networkSettings}
      activeIcon={cn.networkSettingsActive}
      to="settings"
      isSidebarMinimized={isSidebarMinimized}
    />
  </div>
);
