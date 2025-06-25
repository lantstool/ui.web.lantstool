import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useContractMethodsOptions } from './useContractMethodsOptions.js';
import { useStoreState } from '@react-vault';
import { Option } from './OptionsLabel/OptionsLabel.jsx';

export const MethodName = ({ control, form }) => {
  const contractHash = useStoreState((state) => state.nearProtocol.contractAbi.contractHash);
  const options = useContractMethodsOptions(control, 'contractId.value', contractHash, 'read');
  const records = useStoreState((state) => state.nearProtocol.contractAbi.records);

  const onChange = (field) => async (event) => {
    field.onChange(event);
    form.setValue('args', '');

    if (!records[contractHash]?.isAbiSupported) return;
    const methodArgs = records[contractHash]?.readFunctions[event?.value]?.args;

    if (!methodArgs) return;
    form.setValue('args', methodArgs);
  };

  return (
    <FormDropdown
      name="methodName"
      label="Method"
      control={control}
      options={options}
      isSearchable
      isClearable
      creatableSelect
      onChange={onChange}
      components={{
        Option: (props) => (
          <Option props={props} records={records} contractHash={contractHash} methodType="read" />
        ),
      }}
    />
  );
};
