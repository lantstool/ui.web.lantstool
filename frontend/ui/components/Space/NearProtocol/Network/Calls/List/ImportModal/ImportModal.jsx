import { useState } from 'react';
import { BaseModal } from '../../../../../../_general/modals/BaseModal/BaseModal.jsx';
import { ModalHeader } from '../../../../../../_general/modals/ModalHeader/ModalHeader.jsx';
import { TabButton } from '../../../../../../_general/tab/TabButton/TabButton.jsx';
import { TabContainer } from '../../../../../../_general/tab/TabContainer/TabContainer.jsx';
import { PasteJson } from './PasteJson/PasteJson.jsx';
import cn from './ImportModal.module.scss';

export const ImportModal = ({ closeModal }) => {
  const [tab, setTab] = useState('pasteJson');

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <ModalHeader
        title="Import Call"
        close={closeModal}
        classes={{ container: cn.headerContainer }}
      />
      <TabContainer classes={{ container: cn.tabContainer }}>
        <TabButton onClick={() => setTab('pasteJson')} isActive={tab === 'pasteJson'}>
          Paste JSON
        </TabButton>
        <TabButton onClick={() => setTab('file')} isActive={tab === 'file'}>
          Upload .zip
        </TabButton>
      </TabContainer>
      {tab === 'pasteJson' && <PasteJson closeModal={closeModal} />}
    </BaseModal>
  );
};
