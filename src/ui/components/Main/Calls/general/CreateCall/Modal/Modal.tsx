import { useState } from 'react';
import { SelectRpcGroup } from './SelectRpcGroup/SelectRpcGroup.tsx';
import { AccessKeys } from './AccessKeys/AccessKeys.tsx';
import { Accounts } from './Accounts/Accounts.tsx';
import { Contracts } from './Contracts/Contracts.tsx';
import { Block } from './Block/Block.tsx';
import { Chunk } from './Chunk/Chunk.tsx';
import { Gas } from './Gas/Gas.tsx';
import { Protocol } from './Protocol/Protocol.tsx';
import { Network } from './Network/Network.tsx';
import { Transactions } from './Transactions/Transactions.tsx';

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
      {step === 'accounts' && (
        <Accounts closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'contracts' && (
        <Contracts closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'block' && (
        <Block closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'chunk' && (
        <Chunk closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'gas' && (
        <Gas closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'protocol' && (
        <Protocol closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'network' && (
        <Network closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
      {step === 'transactions' && (
        <Transactions closeModal={closeModal} isOpen={isOpen} setStep={setStep} styles={styles} />
      )}
    </>
  );
};
