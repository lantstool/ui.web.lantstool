import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { options } from './options.js';

const findOptionByValue = (options, targetValue) => {
  for (const option of options) {
    if (option.options) {
      const found = findOptionByValue(option.options, targetValue);
      if (found) return found;
    }

    if (option.value === targetValue) {
      return option;
    }
  }
  return '';
};

export const SelectMethod = ({ form }) => {
  return (
    <Controller
      name="method"
      control={form.control}
      render={({ field }) => {
        const value = useMemo(() => findOptionByValue(options, field.value), [field.value]);

        const onChange = (event) => {
          field.onChange(event ? event.value : null);
        };
        return (
          <Select
            value={value}
            onChange={onChange}
            options={options}
            isClearable={true}
            isSearchable
          />
        );
      }}
    />
  );
};
