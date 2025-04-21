import { useStoreAction } from '@react-vault';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@gc/Button/Button.jsx';
import { ModeOption } from './ModeOption/ModeOption.jsx';
import { BeneficiaryId } from './BeneficiaryId/BeneficiaryId.jsx';
import { schema } from './schema.js';
import { useToggler } from '@hooks/useToggler.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConfirmationModal } from './ConfirmationModal/ConfirmationModal.jsx';
// TODO Move to general components
import { SignerId } from './SignerId/SignerId.jsx';
import { SignerKey } from './SignerKey/SignerKey.jsx';
import cn from './Form.module.scss';

const labels = {
  deleteAccount: 'Delete Account',
  clearContractState: 'Clear Contract State',
  deleteAccessKeys: 'Delete Access Keys',
};

export const Form = ({ defaultValues, spaceId, networkId }) => {
  const setAccountCleanerFormValues = useStoreAction(
    (store) => store.nearProtocol.utils.setAccountCleanerFormValues,
  );
  const [isModalOpen, openModal, closeModal] = useToggler(false);

  const form = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control } = form;
  const mode = form.watch('mode');

  const submit = handleSubmit(() => {
    openModal();
  });

  /**
   *  Reset values when user switch to the different space - if he had visited this page
   *  before, the data will be cached and after moving from Space A to Space B user will see
   *  data of A instead of B;
   *  Save form data to the state when move away from the page;
   */
  useEffect(() => {
    form.reset(defaultValues);
    return () =>
      setAccountCleanerFormValues({
        spaceId,
        networkId,
        formValues: form.getValues(),
      });
  }, [spaceId, networkId]);

  return (
    <>
      <div className={cn.form}>
        <h1 className={cn.header}>Account Cleaner</h1>
        <p className={cn.description}>
          Delete an account with a large state or many access keys that can’t be removed using the
          standard method. You can also clear state or delete keys independently.
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
            value="deleteAccessKeys"
            title="Delete Access Keys"
            description="Delete all access keys associated with the account, except the specified Signer Key"
          />
        </div>
        {mode === 'deleteAccount' && <BeneficiaryId control={control} />}
        <div className={cn.footer}>
          <Button size="medium" onClick={submit} color="danger">
            {labels[mode]}
          </Button>
        </div>
      </div>
      {isModalOpen && <ConfirmationModal closeModal={closeModal} form={form} />}
    </>
  );
};
