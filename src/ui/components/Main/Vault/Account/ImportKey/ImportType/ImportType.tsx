import { ModalGroup } from '../ModalGroup/ModalGroup.tsx';

export const ImportType = ({ closeModal, navigate, isOpen }: any) => {
  const onPrevStep = () => navigate('signatureType');
  const onSeedPhrase = () => navigate('seedPhrase');
  const onPrivateKey = () => navigate('privateKey');

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} prevStep={onPrevStep}>
      <h2>How do you want to import your private key?</h2>
      <button onClick={onSeedPhrase}>I have seed phrase</button>
      <button onClick={onPrivateKey}>I have private key</button>
    </ModalGroup>
  );
};
