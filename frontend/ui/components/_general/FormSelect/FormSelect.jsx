import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './formSelect.style.js';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from './ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.jsx';

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

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectComponent
          {...field}
          value={options.find((option) => option.value === field.value)}
          isDisabled={isDisabled}
          onChange={onChange ? onChange(field) : (e) => field.onChange(e?.value || null)}
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
