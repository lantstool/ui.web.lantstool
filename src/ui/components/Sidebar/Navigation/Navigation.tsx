import cn from './Navigation.module.css';
import { LinkItem } from './LinkItem/LinkItem.tsx';

export const Navigation = () => {
  return (
    <div className={cn.navigation}>
      <LinkItem name="Transactions" src="/transaction.svg" to="/transactions" />
      <LinkItem name="Vault" src="/vault.svg" to="/vault" />
      <LinkItem name="Environment" src="/environment.svg" to="/environment" />
      <LinkItem name="Spaces" src="/spaces.svg" to="/spaces" />
      <LinkItem name="Networks" src="/networks.svg" to="/networks" />
    </div>
  );
};
