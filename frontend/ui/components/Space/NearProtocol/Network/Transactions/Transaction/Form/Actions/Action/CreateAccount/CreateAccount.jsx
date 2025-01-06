import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { InputActionGroup } from '../../../../../../../../../_general/input/InputActionGroup/InputActionGroup.jsx';
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
      tooltipContent="Create Account"
    >
      <InputActionGroup
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
