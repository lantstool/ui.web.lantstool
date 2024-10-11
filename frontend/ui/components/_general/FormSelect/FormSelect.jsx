import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './formSelect.style.js';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from './ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.jsx';

/*
  We flat options for more simple find the value because we can have a groped options
 */
const flatOptions = (options) =>
  options.reduce((acc, item) => {
    if (Array.isArray(item.options)) {
      return [...acc, ...flatOptions(item.options)];
    } else {
      acc.push(item);
      return acc;
    }
  }, []);

const findValue = (options, value) => options.find((option) => option.value === value);

export const FormSelect = ({
  control,
  onChange = null,
  options,
  name,
  components,
  isSearchable = false,
  isClearable = false,
  error,
  isDisabled,
  creatableSelect = false,
}) => {
  const style = selectStyles(error);
  const SelectComponent = creatableSelect ? CreatableSelect : Select;
  // const flatOpt = useMemo(() => flatOptions(options), [options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectComponent
          {...field}
          // value={findValue(flatOpt, field.value)}
          isDisabled={isDisabled}
          // onChange={onChange ? onChange(field) : (e) => field.onChange(e?.value || null)}
          onChange={onChange ? onChange(field) : field.onChange}
          isClearable={isClearable}
          isSearchable={isSearchable}
          components={{ ...components, DropdownIndicator, ClearIndicator, IndicatorsContainer }}
          options={options}
          styles={style}
        />
      )}
    />
  );
};
