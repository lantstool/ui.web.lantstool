import { useState } from 'react';
import { SelectRpcGroup } from './SelectRpcGroup/SelectRpcGroup.jsx';
import { CreateName } from './CreateName/CreateName.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateName/schema.js';

export const Modal = ({ styles, isOpen, setOpen }) => {
  const [step, setStep] = useState('createName');
  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { callName: '', method: '' },
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
        <SelectRpcGroup
          form={form}
          closeModal={closeModal}
          isOpen={isOpen}
          styles={styles}
          setStep={setStep}
        />
      )}
    </form>
  );
};
