import { useParams } from 'react-router-dom';
import { Modal } from '../../../../../../_general/Modal/Modal.jsx';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { useStoreEffect, useStoreState } from '@react-vault';
import { createSchema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { CloseCircleOutline } from '../../../../../../_general/icons/CloseCircleOutline.jsx';
import cn from './ImportModal.module.scss';

export const ImportAccount = ({ isOpen, setOpen }) => {
  const { spaceId, networkId } = useParams();
  const records = useStoreState((store) => store.nearProtocol.accounts.records);
  const create = useStoreEffect((store) => store.nearProtocol.accounts.create);
  const schema = createSchema(records);

  const form = useForm({
    defaultValues: { accountId: '', note: '' },
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    resetField,
    clearErrors,
    formState: { errors },
  } = form;

  const closeModal = () => {
    clearErrors();
    setOpen(false);
  };

  const onSubmit = (formValues) => {
    create({ formValues, resetField, spaceId, networkId });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className={cn.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.head}>
          <h3 className={cn.title}>Import account</h3>
          <Button size="small" IconLeft={CloseCircleOutline} onClick={closeModal} />
        </div>
        <Input
          control={control}
          name="accountId"
          error={errors?.accountId?.message}
          placeholder="name.near"
          label="Enter an Account ID. You can also add accounts that are not yet on-chain."
        />
        <Input
          control={control}
          name="note"
          error={errors?.note?.message}
          placeholder="Work account"
          label="Leave a short note about this account (optionally)."
        />
        <div className={cn.button}>
          <Button size="medium" type="submit">
            Import
          </Button>
        </div>
      </form>
    </Modal>
  );
};
