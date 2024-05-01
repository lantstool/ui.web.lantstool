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
import { CreateName } from './CreateName/CreateName.tsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateName/schema.ts';

export const Modal = ({ styles, isOpen, setOpen }: any) => {
  const [step, setStep] = useState('createName');
  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { callName: '' },
  });

  const closeModal = () => {
    setOpen(false);
    setStep('createName');
  };

  return (
    <form>
      {step === 'createName' && (
        <CreateName
          closeModal={closeModal}
          isOpen={isOpen}
          styles={styles}
          form={form}
          setStep={setStep}
        />
      )}
      {step === 'selectRpcGroup' && (
        <SelectRpcGroup closeModal={closeModal} isOpen={isOpen} styles={styles} setStep={setStep} />
      )}
      {step === 'accessKeys' && (
        <AccessKeys
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'accounts' && (
        <Accounts
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'contracts' && (
        <Contracts
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'block' && (
        <Block
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'chunk' && (
        <Chunk
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'gas' && (
        <Gas
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'protocol' && (
        <Protocol
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'network' && (
        <Network
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
      {step === 'transactions' && (
        <Transactions
          closeModal={closeModal}
          isOpen={isOpen}
          setStep={setStep}
          styles={styles}
          form={form}
        />
      )}
    </form>
  );
};
