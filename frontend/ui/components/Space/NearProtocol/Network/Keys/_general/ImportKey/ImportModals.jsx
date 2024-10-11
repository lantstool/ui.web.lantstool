import { SelectImport } from './SelectImport/SelectImport.jsx';
import { SeedPhrase } from './SeedPhrase/SeedPhrase.jsx';
import { PrivateKey } from './PrivateKey/PrivateKey.jsx';
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
        <SelectImport isOpen={isOpen} close={closeModal} setStep={setStep} />
      )}
      {step === 'seedPhrase' && (
        <SeedPhrase isOpen={isOpen} close={closeModal} setStep={setStep} />
      )}
      {step === 'privateKey' && (
        <PrivateKey isOpen={isOpen} close={closeModal} setStep={setStep} />
      )}
    </>
  );
};
