import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { selectStyles } from './dropdown.style.js';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from './ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.jsx';
import { getValue } from './getValue.js';
import cn from './Dropdown.module.scss';

export const Dropdown = ({
  control,
  onChange = null,
  options,
  name,
  error,
  isDisabled,
  creatableSelect = false,
  isSearchable = false,
  isClearable = false,
  label,
  placeholder = 'Select...',
}) => {
  const style = selectStyles(error);
  const SelectComponent = creatableSelect ? CreatableSelect : Select;

  return (
    <div className={cn.container}>
      <label className={cn.label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = getValue(options, field.value);

          const innerOnChange = onChange
            ? onChange(field)
            : (event) => field.onChange(event ? event.value : '');

          return (
            <SelectComponent
              {...field}
              value={value}
              onChange={innerOnChange}
              options={options}
              placeholder={placeholder}
              isDisabled={isDisabled}
              isClearable={isClearable}
              isSearchable={isSearchable}
              components={{ DropdownIndicator, ClearIndicator, IndicatorsContainer }}
              styles={style}
            />
          );
        }}
      />
    </div>
  );
};
