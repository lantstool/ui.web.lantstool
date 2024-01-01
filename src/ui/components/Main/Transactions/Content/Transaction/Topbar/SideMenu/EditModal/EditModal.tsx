import cn from './EditModal.module.css';
import { Modal } from '../../../../../../../general/Modal/Modal.tsx';
import { useStoreEffect, useStoreState } from '../../../../../../../../../react-vault';
import { useForm, useWatch } from 'react-hook-form';

export const EditModal = ({ isOpen, setOpen, closeModal, transactionId }: any) => {
  const onEditTransactionName = useStoreEffect(
    (store: any) => store.transactions.onEditTransactionName,
  );
  const txName: any = useStoreState((state: any) => state.transactions.map[transactionId].name);

  const open = isOpen === 'editModal';

  const form = useForm({ defaultValues: { transactionName: txName } });
  const { register, control } = form;

  const transactionName = useWatch({
    control,
    name: 'transactionName',
  });

  const edit = () => {
    onEditTransactionName({ transactionId, transactionName });
    setOpen(null);
  };
  return (
    <Modal isOpen={open} close={closeModal}>
      <div className={cn.container}>
        <h2 className={cn.title}>Edit transaction name</h2>
        <div className={cn.inputContainer}>
          <label className={cn.label}>Transaction name</label>
          <input {...register('transactionName')} className={cn.input}/>
        </div>
        <div className={cn.buttonGroup}>
          <button className={cn.btnEdit} onClick={edit}>
            Edit
          </button>
          <button className={cn.btnClose} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
