import cn from './Navigation.module.css';
import { LinkItem } from './LinkItem/LinkItem.tsx';

export const Navigation = () => {
  return (
    <div className={cn.navigation}>
      <LinkItem name="Transactions" src="transaction" to="/transactions" />
      <LinkItem name="Vault" src="vault" to="/vault" />
      <LinkItem name="Environment" src="environment" to="/environment" />
      <LinkItem name="Spaces" src="spaces" to="/spaces" />
      <LinkItem name="Networks" src="networks" to="/networks" />
    </div>
  );
};
