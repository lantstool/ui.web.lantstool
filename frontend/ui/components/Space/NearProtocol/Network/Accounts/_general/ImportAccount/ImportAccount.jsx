import { useParams } from 'react-router-dom';
import { Modal } from '../../../../../../_general/Modal/Modal.jsx';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { useStoreEffect, useStoreState } from '../../../../../../../../../react-vault/index.js';
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

  const form = useForm({ resolver: yupResolver(schema) });

  const {
    control,
    register,
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
        <div className={errors?.accountId ? cn.wrapperError : cn.wrapper}>
          <Input
            control={control}
            register={register}
            name="accountId"
            error={errors?.accountId}
            label="Enter an Account ID. You can also add accounts that are not yet on-chain."
          />
          {errors?.accountId?.message && <p className={cn.error}>{errors?.accountId?.message}</p>}
        </div>
        <div className={errors?.note ? cn.wrapperError : cn.wrapper}>
          <Input
            control={control}
            register={register}
            name="note"
            error={errors?.note}
            label="Leave a short note about this account (optionally)."
          />
          {errors?.note && <p className={cn.error}>{errors?.note?.message}</p>}
        </div>
        <div className={cn.button}>
          <Button size="medium" type="submit">
            Import
          </Button>
        </div>
      </form>
    </Modal>
  );
};
