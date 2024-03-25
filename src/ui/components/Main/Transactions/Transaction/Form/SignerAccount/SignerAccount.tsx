import { useStoreEffect } from '../../../../../../../react-vault';
import { useEffect, useState } from 'react';
import { IndicatorsContainer } from '../general/IndicatorsContainer/IndicatorsContainer.tsx';
import cn from './SignerAccount.module.css';
import { FormSelectGroup } from '../../../../../general/FormSelectGroup/FormSelectGroup.tsx';
import { ClearIndicator } from '../general/ClearIndicator/ClearIndicator.tsx';
import { useWatch } from 'react-hook-form';

const getOptions: any = async (getAccountsIds: any, setOptions: any) => {
  const accounts = await getAccountsIds();
  const options = accounts.map((accountId: string) => ({
    value: accountId,
    label: accountId,
  }));
  setOptions(options);
};

export const SignerAccount = ({ form }: any) => {
  const { control, setValue } = form;
  const getAccountsIds = useStoreEffect((store: any) => store.accounts.getAccountsIds);
  const [options, setOptions] = useState([]);
  const accountId = useWatch({ control, name: 'signerId.value' });

  useEffect(() => {
    getOptions(getAccountsIds, setOptions);
  }, []);

  const onChange = (field: any) => (event: any) => {
    field.onChange(event);
    setValue('signerKey', '');
  };

  return (
    <div className={cn.signerAccount}>
      <FormSelectGroup
        name="signerId"
        isSearchable={true}
        isClearable={true}
        onChange={onChange}
        control={control}
        options={options}
        creatableSelect={true}
        components={{ ClearIndicator, IndicatorsContainer }}
        form={form}
        accountId={accountId}
        label="Account Id"
      />
    </div>
  );
};
