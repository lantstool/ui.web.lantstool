import { FormRadioButton } from '@gc/FormRadioButton/FormRadioButton.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNetworkId } from '@hooks/useNetworkId.js';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';
import { Button } from '@gc/Button/Button.jsx';
// TODO Move to general components
import { SignerId } from '../../Transactions/Transaction/Form/SignerId/SignerId.jsx';
import { SignerKey } from '../../Transactions/Transaction/Form/SignerKey/SignerKey.jsx';
import cn from './AccountCleaner.module.scss';

export const AccountCleaner = () => {
  const { spaceId, networkId } = useParams();
  const { isMainnet } = useNetworkId();
  const runAccountCleaner = useStoreEffect((store) => store.nearProtocol.utils.runAccountCleaner);

  useManageRouting(isMainnet);

  const form = useForm({
    defaultValues: {
      // signerId: null,
      // signerKey: null,
      signerId: {
        value: 'nyc-neardrop.near',
        label: 'nyc-neardrop.near',
      },
      signerKey: {
        value: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
        label: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
      },
      mode: 'removeAccessKeys',
    },
    mode: 'onSubmit',
    // resolver: yupResolver(transactionSchema),
  });

  if (!isMainnet) return null;

  const { handleSubmit, control } = form;

  const submit = handleSubmit((formValues) => {
    runAccountCleaner({ formValues, spaceId, networkId });
  });

  return (
    <div className={cn.accountCleaner}>
      <SignerId form={form} />
      <SignerKey form={form} />
      <div className={cn.modeSelector}>
        <FormRadioButton
          control={control}
          label="Delete Account"
          name="mode"
          value="deleteAccount"
        />
        <FormRadioButton control={control} label="Clear State" name="mode" value="clearState" />
        <FormRadioButton
          control={control}
          label="Remove Access Keys"
          name="mode"
          value="removeAccessKeys"
        />
      </div>
      <Button onClick={submit}>Execute</Button>
    </div>
  );
};
