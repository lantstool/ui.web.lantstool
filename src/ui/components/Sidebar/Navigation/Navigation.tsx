import cn from './Navigation.module.css';
import { LinkItem } from './LinkItem/LinkItem.tsx';
import transaction from '../../../../assets/transaction.svg';
import vault from '../../../../assets/vault.svg';
// import environment from '../../../../assets/environment.svg';
// import spaces from '../../../../assets/spaces.svg';
import networks from '../../../../assets/networks.svg';

export const Navigation = () => {
  return (
    <div className={cn.navigation}>
      <LinkItem name="Transactions" src={transaction} to="transactions" />
      <LinkItem name="Vault" src={vault} to="vault" />
      <LinkItem name="Key Vault" src={vault} to="keyVault" />
      <LinkItem name="Networks" src={networks} to="networks" />
    </div>
  );
};
