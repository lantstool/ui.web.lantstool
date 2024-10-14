import cn from './Navigation.module.scss';
import { LinkItem } from './LinkItem/LinkItem.jsx';
import { TransactionFileBold } from '../../../../../_general/icons/TransactionFileBold.jsx';
import { CallsOutline } from '../../../../../_general/icons/CallsOutline.jsx';
import { AccountSquareOutline } from '../../../../../_general/icons/AccountSquareOutline.jsx';
import { KeySquareOutline } from '../../../../../_general/icons/KeySquareOutline.jsx';

export const Navigation = () => (
  <div className={cn.navigation}>
    <LinkItem name="Transactions" Icon={TransactionFileBold} to="transactions" />
    <LinkItem name="Calls" Icon={CallsOutline} to="calls" />
    <LinkItem name="Accounts" Icon={AccountSquareOutline} to="accounts" />
    <LinkItem name="Keys" Icon={KeySquareOutline} to="keys" />
    <LinkItem name="Tools" Icon={AccountSquareOutline} to="tools" />
    <LinkItem name="Settings" Icon={CallsOutline} to="settings" />
  </div>
);
