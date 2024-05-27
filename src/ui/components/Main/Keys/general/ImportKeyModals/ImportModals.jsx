import { ImportKeyModal } from '../ImportKeyModal/ImportKeyModal.jsx';
import { SeedPhraseModal } from '../SeedPhraseModal/SeedPhraseModal.jsx';
import { PrivateKeyModal } from '../PrivateKeyModal/PrivateKeyModal.jsx';
import { useState } from 'react';

export const ImportModals = ({ isOpen, setOpen }) => {
  const [step, setStep] = useState('selectImport');

  const closeModal = () => {
    setOpen(false);
    setStep('selectImport');
  };

  return (
    <>
      {step === 'selectImport' && (
        <ImportKeyModal isOpen={isOpen} close={closeModal} setStep={setStep} />
      )}
      {step === 'seedPhrase' && (
        <SeedPhraseModal isOpen={isOpen} close={closeModal} setStep={setStep} />
      )}
      {step === 'privateKey' && (
        <PrivateKeyModal isOpen={isOpen} close={closeModal} setStep={setStep} />
      )}
    </>
  );
};
