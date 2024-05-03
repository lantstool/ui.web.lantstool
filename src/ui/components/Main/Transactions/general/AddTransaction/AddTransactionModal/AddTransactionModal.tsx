import { useEffect } from 'react';
import { useStoreEffect } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema.ts';
import { Button } from '../../../../general/Button/Button.tsx';
import { Modal } from '../../../../../general/Modal/Modal.jsx';
import { Title } from '../../../../general/Title/Title.tsx';
import { CloseButton } from '../../../../general/CloseButton/CloseButton.tsx';
import { Subtitle } from '../../../../general/Subtitle/Subtitle.tsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';
import { ErrorMessage } from '../../../../general/ErrorMessage/ErrorMessage.tsx';
import cn from './AddTransactionModal.module.css';

export const AddTransactionModal = ({ styles, isOpen, setOpen }: any) => {
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

  useEffect(() => {
    const setCount: any = async () => {
      const count = await getTransactionCount();
      setValue('transactionName', `Transaction#${count}`);
    };
    setCount();
  }, [isOpen]);

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
      <Modal isOpen={isOpen} close={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles}>
            <div className={cn.header}>
              <Title text="Add transaction" />
              <div className={cn.closeBtn}>
                <CloseButton close={closeModal} />
              </div>
            </div>
            <div className={cn.subtitle}>
              <Subtitle text="Select the name of the transaction you want to create" />
            </div>
            <div>
              <InputGroup register={register} name="transactionName" label="Transaction Name" />
              <ErrorMessage error={errors.transactionName?.message} />
            </div>
            <Button text="Create" style="secondary" type="submit" />
          </div>
        </form>
      </Modal>
    </>
  );
};
