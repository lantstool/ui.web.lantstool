import { Dropdown } from '../../../../../../_general/Dropdown/Dropdown.jsx';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { useAccountsOptions } from '../../../_general/hooks/useAccountsOptions.js';
import { useFieldsDefaultValues } from './_general/hooks/useFieldsDefaultValues.js';
import { BlockTarget } from './_general/BlockTarget/BlockTarget.jsx';

export const GetContractState = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  useFieldsDefaultValues(form, {
    contractId: '',
    keyPrefix: '',
    blockTarget: 'latest',
    finality: { value: 'final', label: 'Final' },
    blockId: '',
  });

  return (
    <>
      <Dropdown
        name="params.contractId"
        label="Contract Id"
        control={control}
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <Input name="params.keyPrefix" control={control} label="State Prefix" />
      <BlockTarget form={form} />
    </>
  );
};
