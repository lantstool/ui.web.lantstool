import cn from './EditModal.module.css';
import { Modal } from '../../../../../../general/Modal/Modal.tsx';
import { useStoreEffect } from '../../../../../../../../react-vault';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.ts';
import { InputGroup } from '../../../../../../general/InputGroup/InputGroup.tsx';
import { CloseButton } from '../../../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../../../general/Title/Title.tsx';
import { ErrorMessage } from '../../../../../general/ErrorMessage/ErrorMessage.tsx';
import { Button } from '../../../../../general/Button/Button.tsx';

export const EditModal = ({ isOpen, setOpen,callId, name }: any) => {
  const editCallName = useStoreEffect((store: any) => store.calls.editCallName);

  const open = isOpen === 'editModal';

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { callName: name },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const callName = useWatch({
    control,
    name: 'callName',
  });

  const closeModal = () => {
    setOpen(null);
    reset();
  };

  const edit = () => {
    editCallName({callId, callName });
    setOpen(null);
  };

  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.wrapper}>
          <Title text="Edit name" />
          <div className={cn.closeBtn}>
            <CloseButton close={closeModal} />
          </div>
        </div>
        <div className={cn.inputContainer}>
          <InputGroup
            register={register}
            name="callName"
            textarea={true}
            rows={4}
            label="Call name"
          />
          <ErrorMessage error={errors.callName?.message} />
        </div>
        <Button text="Save" onClick={handleSubmit(edit)} />
      </div>
    </Modal>
  );
};
