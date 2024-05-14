import { useWatch } from 'react-hook-form';
import cn from './Receiver.module.css';
import { useEffect, useState } from 'react';
import { useStoreEffect } from '../../../../../../../react-vault';
import { FormSelectGroup } from '../../../../../general/FormSelectGroup/FormSelectGroup.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';

const getOptions = async (getAccountsIds, setOptions) => {
  const accounts = await getAccountsIds();
  const options = accounts.map((accountId) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};

const selectType = (actions) => {
  const findType = (type) => actions.find((el) => el.type === type);
  const withoutTransfer = actions.filter((el) => el.type !== 'Transfer');

  if (findType('CreateAccount')) {
    return 'CreateAccount';
  } else if (withoutTransfer.length === 0) {
    return 'Transfer';
  } else if (findType('FunctionCall')) {
    return 'FunctionCall';
  } else if (actions.length === 0) {
    return 'Empty';
  } else return 'Disabled';
};

export const Receiver = ({ form }) => {
  const { control, register, setValue } = form;
  const getAccountsIds = useStoreEffect((store) => store.accounts.getAccountsIds);
  const [options, setOptions] = useState([]);
  const accountId = useWatch({ control, name: 'receiver.value' });
  const receiverId = useWatch({ control, name: 'signerKey.permission.functionCall.receiverId' });
  const signerId = useWatch({ control, name: 'signerId' });
  console.log(accountId);
  const actions = useWatch({
    control,
    name: 'actions',
  });

  const receiverType = selectType(actions);

  useEffect(() => {
    // Depending on the type, we clear or change the data so that no errors occur,
    // since we have 2 different types of inputs - InputGroup and FormSelectGroup
    if (receiverType === 'Empty') {
      setValue('receiver', '');
    } else if (receiverType === 'FunctionCall') {
      setValue('receiver', receiverId);
    } else if (receiverType === 'Disabled') {
      setValue('receiver', signerId);
    } else if (receiverType === 'Transfer') {
      setValue('receiver', '');
      getOptions(getAccountsIds, setOptions);
    } else if (receiverType === 'CreateAccount' && accountId) {
      //Clear field when we have accountId cuz in input we haven't receiver.value only receiver
      setValue('receiver', '');
    }
  }, [receiverType]);

  const onChange = (field) => (event) => {
    field.onChange(event);
  };

  if (actions.length === 0) return null;

  return (
    <>
      <h3 className={cn.title}>Receiver</h3>
      {receiverType === 'CreateAccount' && (
        <InputGroup register={register} name="receiver" label="Account Id" />
      )}
      {receiverType === 'FunctionCall' && (
        <InputGroup disabled={true} register={register} name="receiver" label="Account Id" />
      )}
      {(receiverType === 'Transfer' || receiverType === 'Disabled') && (
        <FormSelectGroup
          isDisabled={receiverType === 'Disabled'}
          name="receiver"
          control={control}
          onChange={onChange}
          isSearchable={true}
          isClearable={true}
          options={options}
          creatableSelect={true}
          accountId={accountId}
          label="Account Id"
        />
      )}
    </>
  );
};
