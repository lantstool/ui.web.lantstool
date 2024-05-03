import { useWatch } from 'react-hook-form';
import cn from './Receiver.module.css';
import { useEffect, useState } from 'react';
import { useStoreEffect } from '../../../../../../../react-vault';
import { FormSelectGroup } from '../../../../../general/FormSelectGroup/FormSelectGroup.jsx';

const getOptions = async (getAccountsIds, setOptions) => {
  const accounts = await getAccountsIds();
  const options = accounts.map((accountId) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};

export const Receiver = ({ form }) => {
  const { control } = form;
  const getAccountsIds = useStoreEffect((store) => store.accounts.getAccountsIds);
  const [options, setOptions] = useState([]);
  const accountId = useWatch({ control, name: 'receiver.value' });

  useEffect(() => {
    getOptions(getAccountsIds, setOptions);
  }, []);

  const onChange = (field) => (event) => {
    field.onChange(event);
  };

  const actions = useWatch({
    control,
    name: 'actions',
  });

  if (actions.length === 0) return null;

  return (
    <>
      <h3 className={cn.title}>Receiver</h3>
      <FormSelectGroup
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
    </>
  );
};
