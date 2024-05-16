import { useEffect, useState } from 'react';
import { FormSelectGroup } from '../../../../../../../general/FormSelectGroup/FormSelectGroup.jsx';
import { methods } from './methods.js';

const getOptions = async (methods, setOptions) => {
  const options = methods.map((group) => ({
    ...group,
    options: group.options.map((option) => ({
      ...option,
      value: option.type,
      label: option.type,
    })),
  }));

  setOptions(options);
};

export const MethodSelector = ({ form }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions(methods, setOptions);
  }, []);

  return (
    <div>
      <FormSelectGroup
        name="method"
        label="Select method"
        control={form.control}
        isClearable={true}
        isSearchable
        options={options}
      />
    </div>
  );
};
