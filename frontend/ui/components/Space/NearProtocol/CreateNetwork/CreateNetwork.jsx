import logoLantstool from '@assets/logoLantstool.svg';
import { TabButton } from '../../../_general/tab/TabButton/TabButton.jsx';
import { TabContainer } from '../../../_general/tab/TabContainer/TabContainer.jsx';
import { useState } from 'react';
import { Preset } from './Preset/Preset.jsx';
import { Manually } from './Manually/Manually.jsx';
import cn from './CreateNetwork.module.scss';

export const CreateNetwork = () => {
  const [tab, setTab] = useState('selectPredefined');

  return (
    <div className={cn.container}>
      <img className={cn.logo} src={logoLantstool} alt="#" />
      <div className={cn.form}>
        <h1 className={cn.title}>Add Network</h1>
        <p className={cn.subtitle}>
          Select from standard options or add your own. You can manage them later in settings.
        </p>
        <div className={cn.tab}>
          <TabContainer>
            <TabButton
              onClick={() => setTab('selectPredefined')}
              isActive={tab === 'selectPredefined'}
            >
              Select preset
            </TabButton>
            <TabButton onClick={() => setTab('addManually')} isActive={tab === 'addManually'}>
              Add manually
            </TabButton>
          </TabContainer>
        </div>
        {tab === 'selectPredefined' && <Preset />}
        {tab === 'addManually' && <Manually />}
      </div>
    </div>
  );
};
