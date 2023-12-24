import { useState } from 'react';
import cn from './ImportKey.module.css';
import { useStoreAction, useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { SignatureType } from './SignatureType/SignatureType.tsx';
import { ImportType } from './ImportType/ImportType.tsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.tsx';
import { PrivateKey } from './PrivateKey/PrivateKey.tsx';

export const ImportKey = ({ accountId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const modalStep = useStoreState((store: any) => store.vault.route);
  const navigate = useStoreAction((action: any) => action.vault.navigate);
  const onGetAccessKeyList = useStoreEffect((store: any) => store.vault.onGetAccessKeyList);

  const openModal = () => {
    onGetAccessKeyList({ accountId });
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    navigate('signatureType');
  };

  return (
    <>
      <button className={cn.buttonImport} onClick={openModal}>
        Import key
      </button>
      {modalStep === 'signatureType' && (
        <SignatureType closeModal={closeModal} navigate={navigate} isOpen={isOpen} />
      )}
      {modalStep === 'importType' && (
        <ImportType closeModal={closeModal} navigate={navigate} isOpen={isOpen} />
      )}
      {modalStep === 'seedPhrase' && (
        <SeedPhrase
          closeModal={closeModal}
          navigate={navigate}
          isOpen={isOpen}
          accountId={accountId}
        />
      )}
      {modalStep === 'privateKey' && (
        <PrivateKey
          closeModal={closeModal}
          navigate={navigate}
          isOpen={isOpen}
          accountId={accountId}
        />
      )}
    </>
  );
};
