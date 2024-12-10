import { TabButton } from '../../../../_general/tab/TabButton/TabButton.jsx';
import { TabContainer } from '../../../../_general/tab/TabContainer/TabContainer.jsx';
import { useState } from 'react';
import { Preset } from './Preset/Preset.jsx';
import { Manually } from './Manually/Manually.jsx';
import { BackButton } from '../../../../_general/BackButton/BackButton.jsx';
import logoLantstool from '@assets/logoLantstool.svg';
import cn from './GeneralPage.module.scss';

export const GeneralPage = ({ availablePresets }) => {
  const [tab, setTab] = useState('selectPredefined');

  return (
    <div className={cn.container}>
      <BackButton classes={{ container: cn.backButtonContainer }} />
      <img className={cn.logo} src={logoLantstool} alt="Lantstool logo" />
      <h1 className={cn.title}>Add Network</h1>
      <p className={cn.description}>
        Select from standard options or add your own. You can manage them later in settings.
      </p>
      <div className={cn.tabs}>
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
      {tab === 'selectPredefined' && <Preset availablePresets={availablePresets} />}
      {tab === 'addManually' && <Manually />}
    </div>
  );
};
