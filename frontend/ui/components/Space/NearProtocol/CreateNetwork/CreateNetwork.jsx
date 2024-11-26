import logoLantstool from '@assets/logoLantstool.svg';
import { TabButtons } from '../../../_general/TabButtons/TabButtons.jsx';
import { useState } from 'react';
import { Preset } from './Preset/Preset.jsx';
import { Manually } from './Manually/Manually.jsx';
import cn from './CreateNetwork.module.scss';

export const CreateNetwork = () => {
  const [creationType, setCreationType] = useState('preset');

  return (
    <div className={cn.container}>
      <img className={cn.logo} src={logoLantstool} alt="#" />
      <div className={cn.form}>
        <h1 className={cn.title}>Add Network</h1>
        <p className={cn.subtitle}>
          Select from standard options or add your own. You can manage them later in settings.
        </p>
        <div className={cn.tab}>
          <TabButtons toggle={creationType} changeToggle={setCreationType}>
            <button value="preset">Select preset</button>
            <button value="manually">Add manually</button>
          </TabButtons>
        </div>
        {creationType === 'preset' && <Preset />}
        {creationType === 'manually' && <Manually />}
      </div>
    </div>
  );
};
