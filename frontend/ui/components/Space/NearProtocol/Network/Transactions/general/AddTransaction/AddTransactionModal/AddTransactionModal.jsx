import { useEffect } from 'react';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema.js';
import { Button } from '../../../../_general/Button/Button.jsx';
import { Modal } from '../../../../../../../_general/Modal/Modal.jsx';
import { Title } from '../../../../_general/Title/Title.jsx';
import { CloseButton } from '../../../../_general/CloseButton/CloseButton.jsx';
import { Subtitle } from '../../../../_general/Subtitle/Subtitle.jsx';
import { InputGroup } from '../../../../../../../_general/InputGroup/InputGroup.jsx';
import { ErrorMessage } from '../../../../_general/ErrorMessage/ErrorMessage.jsx';
import cn from './AddTransactionModal.module.css';

export const AddTransactionModal = ({ styles, isOpen, setOpen }) => {
  const onAddTransaction = useStoreEffect((store) => store.transactions.onAddTransaction);
  const getTransactionCount = useStoreEffect((store) => store.transactions.getTransactionCount);
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
    const setCount = async () => {
      const count = await getTransactionCount();
      setValue('transactionName', `Transaction#${count}`);
    };
    setCount();
  }, [isOpen]);

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
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
              <Subtitle text="Select the name of the transaction you want to createSpace" />
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
