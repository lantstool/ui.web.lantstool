import { Button } from '../../../../../general/Button/Button.jsx';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.jsx';
import { TextareaGroup } from '../../../../../../general/TextareaGroup/TextareaGroup.jsx';
import { useEffect } from 'react';
import { useStoreEffect } from '../../../../../../../../react-vault';
import { useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const CreateName = ({ styles, isOpen, form, closeModal }) => {
  const getCallsCount = useStoreEffect((store) => store.calls.getCallsCount);

  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const name = useWatch({ control: form.control, name: 'callName' });
  const createCall = useStoreEffect((store) => store.calls.createCall);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const count = await getCallsCount();
      !name && setValue('callName', `Call#${count}`);
    })();
  }, [isOpen]);

  const createdCall = () => {
    createCall({ name, navigate, close: closeModal });
  };

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} styles={styles} text="Create Call">
      <TextareaGroup
        register={register}
        name="callName"
        label="Call Name"
        rows={4}
        errors={errors.callName?.message}
      />
      <Button
        disabled={errors.callName}
        text="Create name"
        style="secondary"
        onClick={createdCall}
      />
    </ModalGroup>
  );
};
