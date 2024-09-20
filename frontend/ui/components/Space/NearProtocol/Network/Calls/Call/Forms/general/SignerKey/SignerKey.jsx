import { useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../../../../react-vault/index.js';
import { useEffect, useState } from 'react';
import { Option } from './Option/Option.jsx';
import { getOptions } from './getOptions.js';
import { SelectHeadLabel } from './SelectHeadLabel/SelectHeadLabel.jsx';
import { FormSelectGroup } from '../../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';

export const SignerKey = ({ form }) => {
  const { control } = form;
  const getAccessKeyList = useStoreEffect((store) => store.getAccessKeyList);
  const getKeys = useStoreEffect((store) => store.keys.getKeys);
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
