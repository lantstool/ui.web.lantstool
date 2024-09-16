import { useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../../react-vault/index.js';
import { useEffect, useState } from 'react';
import { Option } from '../general/Option/Option.jsx';
import { getOptions } from './getOptions.js';
import { SelectHeadLabel } from '../general/SelectHeadLabel/SelectHeadLabel.jsx';
import { FormSelectGroup } from '../../../../../../../general/FormSelectGroup/FormSelectGroup.jsx';

export const SignerKey = ({ form }) => {
  const { control } = form;
  const getAccessKeyList = useStoreEffect((store) => store.getAccessKeyList);
  const getKeys = useStoreEffect((store) => store.keys.getKeys);
  const [options, setOptions] = useState([]);
  const accountId = useWatch({ control, name: 'signerId.value' });
  const signerKey = useWatch({ control, name: 'signerKey' });

  useEffect(() => {
    getOptions(accountId, getAccessKeyList, getKeys, setOptions);
  }, [accountId]);

  const onChange = (field) => (event) => {
    field.onChange(event);
    if (signerKey?.value !== event?.value) {
      form.setValue('actions', []);
    }
  };

  if (!accountId) return null;

  return (
    <FormSelectGroup
      name="signerKey"
      control={control}
      onChange={onChange}
      options={options}
      isClearable={true}
      components={{ Option }}
    >
      <SelectHeadLabel text="Access Key" permission={signerKey} />
    </FormSelectGroup>
  );
};
