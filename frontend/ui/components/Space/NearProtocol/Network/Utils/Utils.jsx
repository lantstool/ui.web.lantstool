import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { useState } from 'react';
import { Tabs } from '../../../../_general/tabs/Tabs/Tabs.jsx';
import { Tab } from '../../../../_general/tabs/Tab/Tab.jsx';
import { KeyGenerator } from './KeyGenerator/KeyGenerator.jsx';
import { UnitConverter } from './UnitConverter/UnitConverter.jsx';
import cn from './Utils.module.scss';

export const Utils = () => {
  const [activeTab, setActiveTab] = useState('keyGenerator');
  useSaveToHistory();

  return (
    <div className={cn.utils}>
      <div className={cn.contentContainer}>
        <h1 className={cn.headerTitle}>Utils</h1>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
          <Tab name="keyGenerator">Key Generator</Tab>
          <Tab name="unitConverter">Unit Converter</Tab>
        </Tabs>
        {activeTab === 'keyGenerator' && <KeyGenerator />}
        {activeTab === 'unitConverter' && <UnitConverter />}
      </div>
    </div>
  );
};
