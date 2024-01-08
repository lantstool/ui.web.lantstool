import { Modal } from '../../../../general/Modal/Modal.tsx';
import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import cn from './AddTransaction.module.css';
import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { Title } from '../../../general/Title/Title.tsx';
import { CloseButton } from '../../../general/CloseButton/CloseButton.tsx';
import { ErrorMessage } from '../../../general/ErrorMessage/ErrorMessage.tsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.ts';

export const AddTransaction = ({ styles }: any) => {
  const [isOpen, setOpen]: any = useState(false);
  const onAddTransaction = useStoreEffect((store: any) => store.transactions.onAddTransaction);
  const getTransactionCount = useStoreEffect(
    (store: any) => store.transactions.getTransactionCount,
  );
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { transactionName: 'Transaction' },
  });

  const transactionName = useWatch({
    control,
    name: 'transactionName',
  });

  const openModal = async () => {
    const count = await getTransactionCount();
    setValue('transactionName', `Transaction#${count}`);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    reset();
  };
  const onSubmit = (data: any) => {
    onAddTransaction({ data, transactionName, closeModal, navigate });
    setOpen(false);
    reset();
  };
  return (
    <>
      <button className={cn.addBtn} onClick={openModal}>
        Add transaction
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles}>
            <div className={cn.header}>
              <Title text="Add transaction" />
              <CloseButton close={closeModal} />
            </div>
            <p>You can add your transaction and save all data for next time.</p>
            <div>
              <InputGroup
                register={register}
                name="transactionName"
                label="Transaction name"
                textarea={true}
                rows={4}
              />
              <ErrorMessage error={errors.transactionName?.message} />
            </div>
            <button className={cn.btnAddTransaction} type="submit">
              Add transaction
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
