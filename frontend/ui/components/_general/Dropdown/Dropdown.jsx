import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { selectStyles } from './dropdown.style.js';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from './ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.jsx';
import cn from './Dropdown.module.scss';

export const Dropdown = ({
  control,
  onChange = false,
  options,
  name,
  isSearchable = false,
  isClearable = false,
  error,
  isDisabled,
  creatableSelect = false,
  label,
}) => {
  const style = selectStyles(error);
  const SelectComponent = creatableSelect ? CreatableSelect : Select;

  return (
    <div className={cn.container}>
      <label className={cn.label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectComponent
            {...field}
            placeholder="Input text"
            isDisabled={isDisabled}
            onChange={onChange ? onChange(field) : field.onChange}
            isClearable={isClearable}
            isSearchable={isSearchable}
            components={{ DropdownIndicator, ClearIndicator, IndicatorsContainer }}
            options={options}
            styles={style}
          />
        )}
      />
    </div>
  );
};
