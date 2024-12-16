import { ActionBase } from '../_general/ActionBase/ActionBase.jsx';
import { InputActionGroup } from '../../../../../../../../../_general/InputActionGroup/InputActionGroup.jsx';
import { useEffect } from 'react';

export const CreateAccount = ({ iconStyle, getName, form, removeAction, name, order }) => {
  const signerId = form.watch('signerId');
  const accountId = form.watch(getName('accountId'));
  const singleValue = signerId ? `.${signerId.value}` : '';

  useEffect(() => {
    if (accountId && signerId) {
      form.setValue('receiverId', {
        value: `${accountId}${singleValue}`,
        label: `${accountId}${singleValue}`,
      });
    }
    if (!accountId || !signerId) {
      form.setValue('receiverId', {
        value: '',
        label: '',
      });
    }
  }, [accountId, signerId]);

  const remove = () => {
    form.setValue('receiverId', signerId);
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
        control={form.control}
        inputGroup="text"
        name={getName('accountId')}
        label="Account id"
        singleValue={singleValue}
        dynamicErrorSpace
      />
    </ActionBase>
  );
};
