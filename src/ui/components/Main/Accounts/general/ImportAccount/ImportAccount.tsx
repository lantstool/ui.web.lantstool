import { ModalGroup } from '../../../../general/ModalGroup/ModalGroup.tsx';
import { useForm } from 'react-hook-form';
import { TextareaGroup } from '../../../../general/TextareaGroup/TextareaGroup.tsx';
import { Button } from '../../../general/Button/Button.tsx';
import cn from './ImportModal.module.css';
import addIcon from '../../../../../assets/addIcon.svg';
import { MessageGroup } from './MessageGroup/MessageGroup.tsx';
import { useStoreEffect, useStoreState } from '../../../../../../react-vault';
import { createSchema } from './schema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

export const ImportAccount = ({ isOpen, setOpen }) => {
  const addAccount = useStoreEffect((store: any) => store.accounts.addAccount);
  const records: any = useStoreState((store: any) => store.accounts.records);
  const [accId, setAccId] = useState(null);
  const schema = createSchema(records);

  const form = useForm({ resolver: yupResolver(schema) });

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, dirtyFields },
  } = form;

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit = (formValue: any) => {
    addAccount({ formValue, setAccId, resetField });
  };

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} text="Import Account">
      <form className={cn.container} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cn.title}>
          Enter an account ID to track. You can add accounts that are currently not on-chain.
        </h3>
        <div className={cn.accountId}>
          <TextareaGroup
            register={register}
            name="accountId"
            rows={3}
            errors={errors?.accountId?.message}
            label="Account Id"
          />
        </div>
        <div className={cn.name}>
          <TextareaGroup
            register={register}
            name="accountName"
            rows={3}
            errors={errors?.accountName?.message}
            label="Name (optional)"
          />
        </div>
        <div className={cn.message}>
          <MessageGroup
            errors={errors?.accountId}
            accountId={accId}
            dirtyFields={dirtyFields.accountId}
          />
        </div>
        <div className={cn.button}>
          <Button text="Import" type="submit" src={addIcon} style="secondary" />
        </div>
      </form>
    </ModalGroup>
  );
};
