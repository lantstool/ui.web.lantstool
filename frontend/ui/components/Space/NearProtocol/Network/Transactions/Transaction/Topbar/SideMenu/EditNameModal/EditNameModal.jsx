import cn from './EditNameModal.module.scss';
import { Modal } from '../../../../../../../../_general/Modal/Modal.jsx';
import { useStoreEffect } from '../../../../../../../../../../../react-vault/index.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { InputGroup } from '../../../../../../../../_general/InputGroup/InputGroup.jsx';
import { CloseButton } from '../../../../../_general/CloseButton/CloseButton.jsx';
import { Title } from '../../../../../_general/Title/Title.jsx';
import { ErrorMessage } from '../../../../../_general/ErrorMessage/ErrorMessage.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';

export const EditNameModal = ({ closeModal, transaction }) => {
  const { transactionId, name } = transaction;
  const updateOneName = useStoreEffect((store) => store.nearProtocol.transactions.updateOneName);

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const close = () => {
    closeModal();
    reset();
  };

  const editName = handleSubmit((formValues) => {
    updateOneName({ formValues, transactionId, closeModal: close });
  });

  return (
    <Modal isOpen={open} close={close}>
      <div className={cn.container}>
        <div className={cn.wrapper}>
          <Title text="Edit name" />
          <CloseButton close={close} />
        </div>
        <div className={cn.inputContainer}>
          <InputGroup
            register={register}
            name="name"
            textarea={true}
            rows={4}
            label="Transaction name"
          />
          <ErrorMessage error={errors.name?.message} />
        </div>
        <Button text="Save" onClick={editName} style="secondary" />
      </div>
    </Modal>
  );
};
