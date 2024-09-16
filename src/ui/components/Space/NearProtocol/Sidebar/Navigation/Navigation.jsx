import cn from './Navigation.module.css';
import { LinkItem } from './LinkItem/LinkItem.jsx';
import transaction from '../../../../../assets/transaction.svg';
import vault from '../../../../../assets/vault.svg';
import environment from '../../../../../assets/environment.svg';
import spaces from '../../../../../assets/spaces.svg';
import networks from '../../../../../assets/networks.svg';

export const Navigation = () => (
  <div className={cn.navigation}>
    <LinkItem name="Transactions" src={transaction} to="transactions" />
    <LinkItem name="Calls" src={environment} to="calls" />
    <LinkItem name="Accounts" src={spaces} to="accounts" />
    <LinkItem name="Keys" src={vault} to="keys" />
    <LinkItem name="Networks" src={networks} to="networks" />
  </div>
);
