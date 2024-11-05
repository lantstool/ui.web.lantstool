import { useState } from 'react';
import { KeyBold } from '../../../../../_general/icons/KeyBold.jsx';
import { PasswordSeedPhraseInputOutline } from '../../../../../_general/icons/PasswordSeedPhraseInputOutline.jsx';
import { Ledger } from '../../../../../_general/icons/Ledger.jsx';
import { Item } from './Item/Item.jsx';
import { PrivateKey } from './PrivateKey/PrivateKey.jsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.jsx';
import { Modal } from '../../../../../_general/Modal/Modal.jsx';
import cn from './ImportKeyModal.module.scss';

export const ImportKeyModal = ({ isOpen, setOpen }) => {
  const [formType, setFormType] = useState('privateKey');

  const closeModal = () => {
    setOpen(false);
    setFormType('privateKey');
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className={cn.importKeyModal}>
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
          {formType === 'privateKey' && <PrivateKey closeModal={closeModal} />}
          {formType === 'seedPhrase' && <SeedPhrase closeModal={closeModal} />}
        </div>
      </div>
    </Modal>
  );
};
