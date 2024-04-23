import { useState } from 'react';
import { SelectRpcGroup } from './SelectRpcGroup/SelectRpcGroup.tsx';
import { AccessKeys } from './AccessKeys/AccessKeys.tsx';
import { Contracts } from './Contracts/Contracts.tsx';

export const Modal = ({ styles, isOpen, setOpen }: any) => {
  const [step, setStep] = useState('selectRpcGroup');

  const closeModal = () => {
    setOpen(false);
    setStep('selectRpcGroup');
  };

  return (
    <>
      {step === 'selectRpcGroup' && (
        <SelectRpcGroup closeModal={closeModal} isOpen={isOpen} styles={styles} setStep={setStep} />
      )}
      {step === 'accessKeys' && (
        <AccessKeys closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'contracts' && (
        <Contracts closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
    </>
  );
};
