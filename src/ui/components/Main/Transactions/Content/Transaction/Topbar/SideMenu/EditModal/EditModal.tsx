import cn from './EditModal.module.css';
import { Modal } from '../../../../../../../general/Modal/Modal.tsx';
import { useStoreEffect, useStoreState } from '../../../../../../../../../react-vault';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.ts';
import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.tsx';
import { CloseButton } from '../../../../../../general/CloseButton/CloseButton.tsx';
import { Title } from '../../../../../../general/Title/Title.tsx';
import { ErrorMessage } from '../../../../../../general/ErrorMessage/ErrorMessage.tsx';

export const EditModal = ({ isOpen, setOpen, transactionId }: any) => {
  const onEditTransactionName = useStoreEffect(
    (store: any) => store.transactions.onEditTransactionName,
  );
  const txName: any = useStoreState((state: any) => state.transactions.map[transactionId].name);

  const open = isOpen === 'editModal';

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { transactionName: txName },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const transactionName = useWatch({
    control,
    name: 'transactionName',
  });

  const closeModal = () => {
    setOpen(null);
    reset();
  };

  const edit = () => {
    onEditTransactionName({ transactionId, transactionName });
    setOpen(null);
  };

  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <div className={cn.wrapper}>
          <Title text="Edit name" />
          <CloseButton close={closeModal} />
        </div>

        <div className={cn.inputContainer}>
          <InputGroup
            register={register}
            name="transactionName"
            textarea={true}
            rows={4}
            label="Transaction name"
          />
          <ErrorMessage error={errors.transactionName?.message} />
        </div>
        <button className={cn.btnSave} onClick={handleSubmit(edit)}>
          Save
        </button>
      </div>
    </Modal>
  );
};
