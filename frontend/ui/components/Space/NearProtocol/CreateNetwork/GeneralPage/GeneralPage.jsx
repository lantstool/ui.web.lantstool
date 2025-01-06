import { GeneralPageForm } from '../../../../_general/nearProtocol/GeneralPageForm/GeneralPageForm.jsx';
import { Manually } from './Manually/Manually.jsx';
import { Preset } from './Preset/Preset.jsx';
import { useState } from 'react';
import { BackButton } from '../../../../_general/BackButton/BackButton.jsx';
import cn from './GeneralPage.module.scss';

export const GeneralPage = ({ availablePresets }) => {
  const [tab, setTab] = useState('selectPredefined');

  return (
    <div className={cn.generalPage}>
      <BackButton />
      <GeneralPageForm setTab={setTab} tab={tab}>
        {tab === 'selectPredefined' && <Preset availablePresets={availablePresets} />}
        {tab === 'addManually' && <Manually />}
      </GeneralPageForm>
    </div>
  );
};
