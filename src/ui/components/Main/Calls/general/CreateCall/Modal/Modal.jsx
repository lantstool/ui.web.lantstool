import { useState } from 'react';
import { SelectRpcGroup } from './SelectRpcGroup/SelectRpcGroup.jsx';
import { AccessKeys } from './AccessKeys/AccessKeys.jsx';
import { Accounts } from './Accounts/Accounts.jsx';
import { Contracts } from './Contracts/Contracts.jsx';
import { Block } from './Block/Block.jsx';
import { Chunk } from './Chunk/Chunk.jsx';
import { Gas } from './Gas/Gas.jsx';
import { Protocol } from './Protocol/Protocol.jsx';
import { Network } from './Network/Network.jsx';
import { Transactions } from './Transactions/Transactions.jsx';
import { CreateName } from './CreateName/CreateName.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateName/schema.js';

export const Modal = ({ styles, isOpen, setOpen }) => {
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
