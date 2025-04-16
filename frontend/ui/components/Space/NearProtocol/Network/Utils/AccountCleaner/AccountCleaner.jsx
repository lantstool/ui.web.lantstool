import { useNetworkId } from '@hooks/useNetworkId.js';
import { useManageRouting } from './useManageRouting.js';
import cn from './AccountCleaner.module.scss';

export const AccountCleaner = () => {
  const { isMainnet } = useNetworkId();
  useManageRouting(isMainnet);

  if (!isMainnet) return null;

  return <div className={cn.accountCleaner}>AccountCleaner component</div>;
};
