import { FormSelectGroup } from '../../../../../../../../../_general/FormSelectGroup/FormSelectGroup.jsx';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { getOptions } from './getOptions.js';
import { useStoreState } from '@react-vault';

export const MethodName = ({ form }) => {
  const { control } = form;
  const [options, setOptions] = useState([]);
  const rpc = useStoreState((store) => store.networks.current.url.rpc);
  const contractId = useWatch({ control, name: 'params.account_id.value' });

  useEffect(() => {
    getOptions(contractId, rpc, setOptions);
  }, [contractId]);

  return (
    <FormSelectGroup
      name="params.method_name"
      control={control}
      options={options}
      isSearchable={true}
      isClearable={true}
      creatableSelect={true}
    >

    </FormSelectGroup>
  );
};
