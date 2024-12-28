import { useState } from 'react';
import { Item } from './Item/Item.jsx';
import { PrivateKey } from './PrivateKey/PrivateKey.jsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.jsx';
import { BaseModal } from '../../../../../_general/modals/BaseModal/BaseModal.jsx';
import cn from './ImportKeyModal.module.scss';

export const ImportKeyModal = ({
  privateKeySchema,
  seedPhraseSchema,
  closeModal,
  setKey = () => ({}),
}) => {
  const [formType, setFormType] = useState('seedPhrase');

  return (
    <BaseModal close={closeModal} classes={{ modal: cn.modal }}>
      <div className={cn.list}>
        <Item
          formType={formType}
          setFormType={setFormType}
          type="seedPhrase"
          icon={cn.seedPhraseIcon}
          activeIcon={cn.seedPhraseOutlineIcon}
        >
          Seed phrase
        </Item>
        <Item
          formType={formType}
          setFormType={setFormType}
          type="privateKey"
          icon={cn.privateKeyIcon}
          activeIcon={cn.privateKeyOutlineIcon}
        >
          Private key
        </Item>
        <Item label="Soon" disabled={true} icon={cn.ledgerIcon}>
          Ledger
        </Item>
      </div>
      <div className={cn.content}>
        {formType === 'privateKey' && (
          <PrivateKey privateKeySchema={privateKeySchema} closeModal={closeModal} setKey={setKey} />
        )}
        {formType === 'seedPhrase' && (
          <SeedPhrase seedPhraseSchema={seedPhraseSchema} closeModal={closeModal} setKey={setKey} />
        )}
      </div>
    </BaseModal>
  );
};
