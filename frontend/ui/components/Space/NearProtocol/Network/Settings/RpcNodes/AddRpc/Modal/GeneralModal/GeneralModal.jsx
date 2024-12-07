import { useState } from 'react';
import { BaseModal } from '../../../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '../../../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { TabButton } from '../../../../../../../../_general/tab/TabButton/TabButton.jsx';
import { TabContainer } from '../../../../../../../../_general/tab/TabContainer/TabContainer.jsx';
import { SelectPredefined } from './SelectPredefined/SelectPredefined.jsx';
import { AddManually } from './AddManually/AddManually.jsx';
import cn from './GeneralModal.module.scss';

export const GeneralModal = ({ network, availablePredefinedRpcs, close }) => {
  const [tab, setTab] = useState('selectPredefined');

  return (
    <BaseModal close={close} classes={{ modal: cn.modal }}>
      <ModalHeader title="Add RPC" close={close} classes={{ container: cn.headerContainer }} />
      <div className={cn.tabContainer}>
        <TabContainer>
          <TabButton
            onClick={() => setTab('selectPredefined')}
            isActive={tab === 'selectPredefined'}
          >
            Select predefined
          </TabButton>
          <TabButton onClick={() => setTab('addManually')} isActive={tab === 'addManually'}>
            Add manually
          </TabButton>
        </TabContainer>
      </div>
      {tab === 'selectPredefined' && (
        <SelectPredefined
          network={network}
          availablePredefinedRpcs={availablePredefinedRpcs}
          close={close}
        />
      )}
      {tab === 'addManually' && <AddManually network={network} />}
    </BaseModal>
  );
};
