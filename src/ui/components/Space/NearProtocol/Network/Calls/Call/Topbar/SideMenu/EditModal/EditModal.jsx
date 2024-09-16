import cn from './EditModal.module.css';
import { Modal } from '../../../../../../../../general/Modal/Modal.jsx';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.jsx';
import { CloseButton } from '../../../../../general/CloseButton/CloseButton.jsx';
import { Title } from '../../../../../general/Title/Title.jsx';
import { ErrorMessage } from '../../../../../general/ErrorMessage/ErrorMessage.jsx';
import { Button } from '../../../../../general/Button/Button.jsx';

export const EditModal = ({ isOpen, setOpen, callId, name }) => {
  const editCallName = useStoreEffect((store) => store.calls.editCallName);

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
    editCallName({ callId, callName });
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
