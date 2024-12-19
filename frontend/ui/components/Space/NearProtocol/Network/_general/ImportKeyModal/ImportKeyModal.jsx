import { useState } from 'react';
import { KeyBold } from '../../../../../_general/icons/KeyBold.jsx';
import { PasswordSeedPhraseInputOutline } from '../../../../../_general/icons/PasswordSeedPhraseInputOutline.jsx';
import { Ledger } from '../../../../../_general/icons/Ledger.jsx';
import { Item } from './Item/Item.jsx';
import { PrivateKey } from './PrivateKey/PrivateKey.jsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.jsx';
import { BaseModal } from '../../../../../_general/modals/BaseModal/BaseModal.jsx';
import cn from './ImportKeyModal.module.scss';

export const ImportKeyModal = ({ closeModal, setKey = () => ({}) }) => {
  const [formType, setFormType] = useState('privateKey');

  const close = () => {
    closeModal();
    setFormType('privateKey');
  };

  return (
    <BaseModal close={close} classes={{ modal: cn.modal }}>
      <div className={cn.list}>
        <Item formType={formType} setFormType={setFormType} type="privateKey" Icon={KeyBold}>
          Private key
        </Item>
        <Item
          formType={formType}
          setFormType={setFormType}
          type="seedPhrase"
          Icon={PasswordSeedPhraseInputOutline}
        >
          Seed phrase
        </Item>
        <Item Icon={Ledger} label="Soon" disabled={true}>
          Ledger
        </Item>
      </div>
      <div className={cn.content}>
        {formType === 'privateKey' && <PrivateKey closeModal={close} setKey={setKey} />}
        {formType === 'seedPhrase' && <SeedPhrase closeModal={close} setKey={setKey} />}
      </div>
    </BaseModal>
  );
};
