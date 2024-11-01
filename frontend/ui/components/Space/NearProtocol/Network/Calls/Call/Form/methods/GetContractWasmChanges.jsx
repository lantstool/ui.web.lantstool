import { Dropdown } from '../../../../../../../_general/Dropdown/Dropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { useFieldsDefaultValues } from '../_general/hooks/useFieldsDefaultValues.js';
import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';

export const GetContractWasmChanges = ({ form }) => {
  const { control } = form;
  const options = useAccountsOptions();

  useFieldsDefaultValues(form, {
    contractId: '',
    blockTarget: 'specific',
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
      <BlockTarget form={form} />
    </>
  );
};
