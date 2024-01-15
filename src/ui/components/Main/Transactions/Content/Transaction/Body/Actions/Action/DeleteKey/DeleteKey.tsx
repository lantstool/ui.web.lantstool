import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useStoreEffect } from '../../../../../../../../../../react-vault';
import { selectStyles } from '../../../general/selectStyles.ts';
import { Controller, useWatch } from 'react-hook-form';
import { getOptions } from './getOptions.ts';
import cn from '../../../general/Option/Option.module.css';
import { Option } from '../../../general/Option/Option.tsx';
import { Head } from '../../../general/Head/Head.tsx';

export const DeleteKey = ({ form, getName, action }: any) => {
  const [options, setOptions] = useState([]);
  const [publicKey, setPublicKey] = useState(action.publicKey);
  const getAccessKeyList = useStoreEffect((store: any) => store.getAccessKeyList);
  const { control } = form;
  const accountId = useWatch({ control, name: 'signerId.value' });

  const onChange = (field: any) => (event: any) => {
    field.onChange(event);
    setPublicKey(event);
  };

  useEffect(() => {
    getOptions(accountId, getAccessKeyList, setOptions);
  }, [accountId]);

  return (
    <div className={cn.signerKey}>
      <Head text="Access Key" permission={publicKey} />
      <Controller
        name={getName('publicKey')}
        control={control}
        render={({ field }: any) => (
          <Select
            {...field}
            onChange={onChange(field)}
            isSearchable
            components={{ Option }}
            options={options}
            styles={selectStyles}
          />
        )}
      />
    </div>
  );
};
