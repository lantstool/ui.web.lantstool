import { Button } from '../../../../general/Button/Button.tsx';
import { ModalGroup } from '../../ModalGroup/ModalGroup.tsx';
import { TextareaGroup } from '../../../../../general/TextareaGroup/TextareaGroup.tsx';
import { useEffect } from 'react';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useWatch } from 'react-hook-form';

export const CreateName = ({ styles, isOpen, form, closeModal, setStep }: any) => {
  const getCallsCount = useStoreEffect((store: any) => store.calls.getCallsCount);

  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const name = useWatch({ control: form.control, name: 'callName' });

  useEffect(() => {
    (async () => {
      const count = await getCallsCount();
      !name && setValue('callName', `Call#${count}`);
    })();
  }, [isOpen]);


  const nextStep = () => setStep('selectRpcGroup');

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} styles={styles} text="Create Call">
      <TextareaGroup
        register={register}
        name="callName"
        label="Call Name"
        rows={4}
        errors={errors.callName?.message}
      />
      <Button text="Create name" style="secondary" onClick={nextStep} />
    </ModalGroup>
  );
};
