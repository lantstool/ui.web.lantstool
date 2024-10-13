import cn from './Navigation.module.scss';
import { LinkItem } from './LinkItem/LinkItem.jsx';
import { TransactionFileBold } from '../../../../_general/icons/TransactionFileBold.jsx';
import { CallsOutline } from '../../../../_general/icons/CallsOutline.jsx';
import { AccountSquareOutline } from '../../../../_general/icons/AccountSquareOutline.jsx';
import { KeySquareOutline } from '../../../../_general/icons/KeySquareOutline.jsx';

export const Navigation = ({isOpen}) => (
  <div className={cn.navigation}>
    <LinkItem isOpen={isOpen} name="Transactions" Icon={TransactionFileBold} to="transactions" />
    <LinkItem isOpen={isOpen} name="Calls" Icon={CallsOutline} to="calls" />
    <LinkItem isOpen={isOpen} name="Accounts" Icon={AccountSquareOutline} to="accounts" />
    <LinkItem isOpen={isOpen} name="Keys" Icon={KeySquareOutline} to="keys" />
  </div>
);
