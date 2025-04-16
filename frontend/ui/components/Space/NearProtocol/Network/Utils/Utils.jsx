import { Tabs } from '@gc/tabs/Tabs/Tabs.jsx';
import { TabLink } from '@gc/tabs/TabLink/TabLink.jsx';
import { Outlet } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';
import cn from './Utils.module.scss';

export const Utils = () => {
  useManageRouting();

  return (
    <div className={cn.utils}>
      <div className={cn.contentContainer}>
        <h1 className={cn.headerTitle}>Utils</h1>
        <Tabs>
          <TabLink to="key-generator">Key Generator</TabLink>
          <TabLink to="unit-converter">Unit Converter</TabLink>
        </Tabs>
        <Outlet />
      </div>
    </div>
  );
};
