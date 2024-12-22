import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { InputActionGroup } from '../../../../../../../../../_general/input/InputActionGroup/InputActionGroup.jsx';
import { useEffect } from 'react';

const updateReceiverId = (accountId, signerId, singleValue, setValue) => {
  const newValue =
    accountId && signerId
      ? { value: `${accountId}${singleValue}`, label: `${accountId}${singleValue}` }
      : null;

  setValue('receiverId', newValue);
};

export const CreateAccount = ({ iconStyle, getName, form, removeAction, name, order }) => {
  const { control, setValue, watch } = form;
  const signerId = watch('signerId');
  const accountId = watch(getName('accountId'));
  const singleValue = signerId ? `.${signerId.value}` : null;

  useEffect(() => {
    updateReceiverId(accountId, signerId, singleValue, setValue);
  }, [accountId, signerId, singleValue]);

  const remove = () => {
    setValue('receiverId', null);
    removeAction();
  };

  return (
    <ActionBase
      label={name}
      iconStyle={iconStyle}
      color="green"
      order={order}
      removeAction={remove}
      tooltipContent="Create account"
    >
      <InputActionGroup
        control={control}
        inputGroup="text"
        name={getName('accountId')}
        label="Account id"
        singleValue={singleValue}
        placeholder="newaccount"
        dynamicErrorSpace
      />
    </ActionBase>
  );
};
