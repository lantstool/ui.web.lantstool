import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useContractMethodsOptions } from './useContractMethodsOptions.js';
import { Option } from './OptionsLabel/OptionsLabel.jsx';

export const MethodName = ({ control, form }) => {
  const [options, reedFunctions] = useContractMethodsOptions(control, 'contractId.value',);

  const onChange = (field) => async (event) => {
    field.onChange(event);
    form.setValue('args', '');

    const fn = reedFunctions[event?.value];
    if (fn) return form.setValue('args', fn?.args);
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
        Option: (props) => <Option props={props} />,
      }}
    />
  );
};
