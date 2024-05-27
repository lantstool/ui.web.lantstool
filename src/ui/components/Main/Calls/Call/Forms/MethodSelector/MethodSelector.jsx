import { useEffect, useState } from 'react';
import { FormSelectGroup } from '../../../../../general/FormSelectGroup/FormSelectGroup.jsx';
import { methods, data } from './methods.js';

const getOptions = async (data, setOptions) => {
  const options = data.map((group) => ({
    ...group,
    options: group.options.map((option) => ({
      value: option,
      label: option,
    })),
  }));

  setOptions(options);
};

export const MethodSelector = ({ form }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions(data, setOptions);
  }, []);

  const onChange = (field) => (event) => {
    field.onChange(event);
    const method = methods[event?.value];
    if (method) {
      form.setValue('method', method.method);
      form.setValue('params', method.params);
    }
  };

  return (
    <FormSelectGroup
      name="type"
      label="Select method"
      control={form.control}
      onChange={onChange}
      isClearable={true}
      isSearchable
      options={options}
    />
  );
};
