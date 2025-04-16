import { Tabs } from '@gc/tabs/Tabs/Tabs.jsx';
import { useNetworkId } from '@hooks/useNetworkId.js';
import { TabLink } from './TabLink/TabLink.jsx';
import { Outlet } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';
import cn from './Utils.module.scss';

export const Utils = () => {
  const { isMainnet } = useNetworkId();

  useManageRouting();

  return (
    <div className={cn.utils}>
      <div className={cn.contentContainer}>
        <h1 className={cn.headerTitle}>Utils</h1>
        <Tabs>
          <TabLink to="key-generator">Key Generator</TabLink>
          <TabLink to="unit-converter">Unit Converter</TabLink>
          {isMainnet && <TabLink to="account-cleaner">Account Cleaner</TabLink>}
        </Tabs>
        <Outlet />
      </div>
    </div>
  );
};
