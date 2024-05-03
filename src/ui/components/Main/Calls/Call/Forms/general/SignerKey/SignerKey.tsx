import { useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../react-vault';
import { useEffect, useState } from 'react';
import { Option } from './Option/Option.tsx';
import { getOptions } from './getOptions.ts';
import { SelectHeadLabel } from './SelectHeadLabel/SelectHeadLabel.tsx';
import { FormSelectGroup } from '../../../../../../general/FormSelectGroup/FormSelectGroup.jsx';

export const SignerKey = ({ form }: any) => {
  const { control } = form;
  const getAccessKeyList = useStoreEffect((store: any) => store.getAccessKeyList);
  const getKeys = useStoreEffect((store: any) => store.keys.getKeys);
  const [options, setOptions] = useState([]);
  const accountId = useWatch({ control, name: 'params.account_id.value' });
  const signerKey = useWatch({ control, name: 'params.public_key' });

  useEffect(() => {
    getOptions(accountId, getAccessKeyList, getKeys, setOptions);
  }, [accountId]);

  return (
    <>
      <FormSelectGroup
        name="params.public_key"
        control={control}
        options={options}
        components={{ Option }}
      >
        <SelectHeadLabel text="Access Key" permission={signerKey} />
      </FormSelectGroup>
    </>
  );
};
