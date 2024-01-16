import { useState, useEffect } from 'react';
import { useStoreAction, useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { SignatureType } from './SignatureType/SignatureType.tsx';
import { ImportType } from './ImportType/ImportType.tsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.tsx';
import { PrivateKey } from './PrivateKey/PrivateKey.tsx';
import addIcon from '../../../../../../assets/addIcon.svg';
import { Button } from '../../../general/Button/Button.tsx';
import { onSetKeyList } from './onSetKeyList.ts';

export const ImportKey = ({ accountId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const [keyList, setKeyList] = useState([]);
  const modalStep = useStoreState((store: any) => store.vault.route);
  const navigate = useStoreAction((action: any) => action.vault.navigate);
  const getAccessKeyList = useStoreEffect((store: any) => store.getAccessKeyList);

  useEffect(() => {
    onSetKeyList(getAccessKeyList, accountId, setKeyList);
  }, [accountId]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    navigate('signatureType');
  };

  return (
    <>
      <Button text="Import key" onClick={openModal} type="submit" src={addIcon} />
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
