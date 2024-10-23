import { useEffect } from 'react';
import { useLoader } from '@hooks/useLoader.js';
import { useParams } from 'react-router-dom';
import { useStoreAction, useStoreEffect, useStoreState } from '@react-vault';
import { Item } from './Item/Item.jsx';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { useForm } from 'react-hook-form';
import { KeySquareBold } from '../../../../../../_general/icons/KeySquareBold.jsx';
import { schema } from './schema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from './Details.module.scss';

export const Details = () => {
  const { spaceId, networkId, accountId } = useParams();
  const updateOneNote = useStoreEffect((store) => store.nearProtocol.accounts.updateOneNote);
  const getAccountDetails = useStoreEffect(
    (store) => store.nearProtocol.accounts.getAccountDetails,
  );
  const resetAccountDetails = useStoreAction(
    (store) => store.nearProtocol.accounts.resetAccountDetails,
  );
  const details = useStoreState((store) => store.nearProtocol.accounts.account.details);
  const form = useForm({
    defaultValues: { note: '' },
    resolver: yupResolver(schema),
  });
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const [isLoading] = useLoader(getAccountDetails, { spaceId, networkId, accountId, setValue });

  // We have to reset data because we will display the wrong data (of prev account)
  // if user will try to open the non-existing account details page
  useEffect(() => resetAccountDetails, []);

  const editName = handleSubmit((formValues) => {
    updateOneNote({ formValues, accountId });
  });

  if (isLoading) return <p>Loading...</p>;

  const { balance, lockedForStorage, available, storageUsage, hasDeployedContract } = details;

  if (!balance)
    return (
      <div className={cn.empty}>
        <KeySquareBold style={cn.icon} />
        <h1 className={cn.title}>This account is not yet on-chain.</h1>
      </div>
    );

  return (
    <div>
      <div className={cn.details}>
        {balance && <Item title="Account Balance" data={`${balance} NEAR`} />}
        {available && <Item title="Available for Use" data={`${available} NEAR`} />}
        {lockedForStorage && <Item title="Locked for Storage" data={`${lockedForStorage} NEAR`} />}
        {storageUsage && <Item title="Storage Used" data={`${storageUsage / 1000} KB`} />}
        <Item title="Has Deployed Contract" data={hasDeployedContract ? 'Yes' : 'No'} />
      </div>
      <hr className={cn.border} />
      <Input
        onBlur={editName}
        name="note"
        error={errors?.note?.message}
        control={control}
        register={register}
        label="Leave a short note about this account"
      />
    </div>
  );
};
