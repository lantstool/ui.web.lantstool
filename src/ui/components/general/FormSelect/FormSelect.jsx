import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './formSelect.style.js';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from './ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.jsx';

export const FormSelect = ({
  control,
  onChange = false,
  options,
  name,
  components,
  isSearchable = false,
  isClearable = false,
  error,
  creatableSelect = false,
}) => {
  const style = selectStyles(error);
  const SelectComponent = creatableSelect ? CreatableSelect : Select;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <SelectComponent
            {...field}
            onChange={onChange ? onChange(field) : field.onChange}
            isClearable={isClearable}
            isSearchable={isSearchable}
            components={{ ...components, DropdownIndicator, ClearIndicator, IndicatorsContainer }}
            options={options}
            styles={style}
          />
        );
      }}
    />
  );
};
