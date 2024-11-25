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
  onChange = null,
  options,
  name,
  error,
  isDisabled,
  creatableSelect = false,
  isSearchable = false,
  isClearable = false,
  label,
  tooltip = null,
  copy = true,
  placeholder = 'Select...',
}) => {
  const style = selectStyles(error);
  const SelectComponent = creatableSelect ? CreatableSelect : Select;
  const components = { DropdownIndicator, ClearIndicator, ...(copy && { IndicatorsContainer }) };

  return (
    <div className={cn.container}>
      {label && (
        <div className={cn.labelWrapper}>
          <label className={cn.label}>{label}</label>
          {tooltip}
        </div>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const innerOnChange = onChange ? onChange(field) : field.onChange;
          return (
            <SelectComponent
              {...field}
              onChange={innerOnChange}
              options={options}
              placeholder={placeholder}
              isDisabled={isDisabled}
              isClearable={isClearable}
              isSearchable={isSearchable}
              components={{ ...components }}
              styles={style}
            />
          );
        }}
      />
    </div>
  );
};
