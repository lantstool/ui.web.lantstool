import { useState } from 'react';
import { BaseModal } from '../../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '../../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { TabButton } from '../../../../../../../_general/tab/TabButton/TabButton.jsx';
import { TabContainer } from '../../../../../../../_general/tab/TabContainer/TabContainer.jsx';
import { SelectPredefined } from './SelectPredefined/SelectPredefined.jsx';
import { AddManually } from './AddManually/AddManually.jsx';
import cn from './Modal.module.scss';

export const Modal = ({ close }) => {
  const [viewMode, setViewMode] = useState('selectPredefined');

  return (
    <BaseModal close={close}>
      <ModalHeader title="Add RPC" close={close} />
      <TabContainer>
        <TabButton
          onClick={() => setViewMode('selectPredefined')}
          isActive={viewMode === 'selectPredefined'}
        >
          Select predefined
        </TabButton>
        <TabButton onClick={() => setViewMode('addManually')} isActive={viewMode === 'addManually'}>
          Add manually
        </TabButton>
      </TabContainer>
      {viewMode === 'selectPredefined' && <SelectPredefined />}
      {viewMode === 'addManually' && <AddManually />}
    </BaseModal>
  );
};
