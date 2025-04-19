import { yupResolver } from '@hookform/resolvers/yup';
import { useNetworkId } from '@hooks/useNetworkId.js';
import { useStoreEffect } from '@react-vault';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useManageRouting } from './useManageRouting.js';
import { Button } from '@gc/Button/Button.jsx';
import { ModeOption } from './ModeOption/ModeOption.jsx';
import { BeneficiaryId } from './BeneficiaryId/BeneficiaryId.jsx';
import cn from './AccountCleaner.module.scss';
// TODO Move to general components
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';

const labels = {
  deleteAccount: 'Delete Account',
  clearContractState: 'Clear Contract State',
  removeAccessKeys: 'Remove Access Keys',
};

export const AccountCleaner = () => {
  const { spaceId, networkId } = useParams();
  const { isMainnet } = useNetworkId();
  const runAccountCleaner = useStoreEffect((store) => store.nearProtocol.utils.runAccountCleaner);

  useManageRouting(isMainnet);

  const form = useForm({
    // defaultValues: {
    //   signerId: null,
    //   signerKey: null,
    //   mode: 'removeAccessKeys',
    //   beneficiaryId: null,
    // },
    defaultValues: {
      signerId: {
        value: 'nyc-neardrop.near',
        label: 'nyc-neardrop.near',
      },
      signerKey: {
        value: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
        label: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
      },
      mode: 'deleteAccount',
      beneficiaryId: {
        value: 'eclipseeer.near',
        label: 'eclipseeer.near',
      },
    },
    mode: 'onSubmit',
    // resolver: yupResolver(transactionSchema),
  });
  const mode = form.watch('mode');

  if (!isMainnet) return null;

  const { handleSubmit, control } = form;

  const submit = handleSubmit((formValues) => {
    runAccountCleaner({ formValues, spaceId, networkId });
  });

  return (
    <div className={cn.accountCleaner}>
      <h1 className={cn.header}>Account Cleaner</h1>
      <p className={cn.description}>
        Delete accounts with large state or many access keys that can’t be removed using the
        standard method. You can also clear state or remove keys independently.
      </p>
      <SignerId form={form} />
      <SignerKey form={form} />
      <div className={cn.modeSelector}>
        <h2 className={cn.modeTitle}>Operating Mode</h2>
        <ModeOption
          form={form}
          value="deleteAccount"
          title="Delete Account"
          description="Clear the contract state, delete access keys, and delete the account itself"
        />
        <ModeOption
          form={form}
          value="clearContractState"
          title="Clear Contract State"
          description="Remove all key-value entries from the contract’s state"
        />
        <ModeOption
          form={form}
          value="removeAccessKeys"
          title="Remove Access Keys"
          description="Delete all access keys associated with the account, except the specified Signer Key"
        />
      </div>
      {mode === 'deleteAccount' && <BeneficiaryId control={control} />}
      <div className={cn.footer}>
        <Button size="medium" onClick={submit}>
          {labels[mode]}
        </Button>
      </div>
    </div>
  );
};
