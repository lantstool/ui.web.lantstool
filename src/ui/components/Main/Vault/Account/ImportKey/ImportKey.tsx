import { useState } from 'react';
import { useStoreAction } from '../../../../../../react-vault';
import addIcon from '../../../../../assets/addIcon.svg';
import { Button } from '../../../general/Button/Button.tsx';
import { ImportKeyModal } from './ImportKeyModal/ImportKeyModal.tsx';

export const ImportKey = ({ accountId }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const navigate = useStoreAction((action: any) => action.vault.navigate);

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
      {isOpen && (
        <ImportKeyModal
          closeModal={closeModal}
          isOpen={isOpen}
          accountId={accountId}
          navigate={navigate}
        />
      )}
    </>
  );
};
