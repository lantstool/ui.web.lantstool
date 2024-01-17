import { SignatureType } from '../SignatureType/SignatureType.tsx';
import { ImportType } from '../ImportType/ImportType.tsx';
import { SeedPhrase } from '../SeedPhrase/SeedPhrase.tsx';
import { PrivateKey } from '../PrivateKey/PrivateKey.tsx';
import { useEffect, useState } from 'react';
import { onSetKeyList } from '../onSetKeyList.ts';
import { useStoreEffect, useStoreState } from '../../../../../../../react-vault';

export const ImportKeyModal = ({ navigate, closeModal, isOpen, accountId }) => {
  const [keyList, setKeyList] = useState([]);
  const modalStep = useStoreState((store: any) => store.vault.route);
  const getAccessKeyList = useStoreEffect((store: any) => store.getAccessKeyList);

  useEffect(() => {
    onSetKeyList(getAccessKeyList, accountId, setKeyList);
  }, []);

  return (
    <>
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
          keyList={keyList}
        />
      )}
      {modalStep === 'privateKey' && (
        <PrivateKey
          closeModal={closeModal}
          navigate={navigate}
          isOpen={isOpen}
          accountId={accountId}
          keyList={keyList}
        />
      )}
    </>
  );
};
