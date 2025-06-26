import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { useContractMethodsOptions } from './useContractMethodsOptions.js';
import { Option } from './OptionsLabel/OptionsLabel.jsx';

export const MethodName = ({ control, form }) => {
  const { options, argsTemplates } = useContractMethodsOptions(control);

  const onChange = (field) => async (event) => {
    const { argsTemplate } = argsTemplates[event?.value] || '';
    form.setValue('args', argsTemplate);
    field.onChange(event);
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
