import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { FormInputActionGroup } from '../../../../../../../../../_general/input/FormInputActionGroup/FormInputActionGroup.jsx';
import { useEffect } from 'react';

const updateReceiverId = (subAccountId, signerId, singleValue, setValue) => {
  const newValue =
    subAccountId && signerId
      ? { value: `${subAccountId}${singleValue}`, label: `${subAccountId}${singleValue}` }
      : null;

  setValue('receiverId', newValue);
};

export const CreateAccount = ({ iconStyle, getName, form, removeAction, order }) => {
  const { control, setValue, watch } = form;
  const signerId = watch('signerId');
  const subAccountId = watch(getName('subAccountId'));
  const singleValue = signerId ? `.${signerId.value}` : null;

  useEffect(() => {
    updateReceiverId(subAccountId, signerId, singleValue, setValue);
  }, [subAccountId, signerId, singleValue]);

  const remove = () => {
    setValue('receiverId', null);
    removeAction();
  };

  return (
    <ActionBase
      label="Create Account"
      iconStyle={iconStyle}
      color="green"
      order={order}
      removeAction={remove}
      tooltipContent={
        <>
          Creates a subaccount for the signer. For example:
          <br />• lantstool.testnet can create dev.lantstool.testnet;
          <br />• lantstool.testnet cannot create alice.testnet or alice.dev.lantstool.testnet.
          <br />
          <br />
          Additional notes:
          <br />• This action must always be the first in the list.
          <br />• A subaccount ID may only consist of Latin letters, digits, -, and _.
          <br />• The total length of the Account ID must not exceed 64 characters.
          <br />• All subsequent actions in the list, such as Deploy Contract or Function Call, will
          pertain to this subaccount rather than the original Signer.
          <br />• Once created, the subaccount becomes a fully independent account, and the Signer
          will no longer be able to perform actions (e.g., Transfer or Delete Account) on its
          behalf.
        </>
      }
    >
      <FormInputActionGroup
        control={control}
        inputGroup="text"
        name={getName('subAccountId')}
        label="Sub Account Id"
        singleValue={singleValue}
        placeholder="newaccount"
        dynamicErrorSpace
      />
    </ActionBase>
  );
};
