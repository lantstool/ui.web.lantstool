import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { DropdownIndicator } from '../Dropdown/DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from '../Dropdown/ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from '../Dropdown/IndicatorsContainer/IndicatorsContainer.jsx';
import { Option } from '../Dropdown/Option/Option.jsx';
import { selectStyles } from './formDropdownGroup.style.js';
import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import cnm from 'classnames';
import cn from './FormDropdownGroup.module.scss';

export const FormDropdownGroup = ({
  onChange,
  control,
  name,
  options,
  disabled,
  creatableSelect = false,
  isSearchable = false,
  isClearable = false,
  copy = true,
  placeholder = 'Select...',
  label = null,
  tooltip = null,
  onClick,
  actionDisabled = false,
  dynamicErrorSpace,
  iconStyles,
}) => {
  const SelectComponent = creatableSelect ? CreatableSelect : Select;
  const components = {
    DropdownIndicator,
    ClearIndicator,
    Option,
    ...(copy && { IndicatorsContainer }),
  };
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const style = selectStyles(error);
        const innerOnChange = onChange ? onChange(field) : field.onChange;
        return (
          <div className={cn.formDropdownGroup}>
            {label && (
              <div className={cn.labelWrapper}>
                <label className={cn.label}>{label}</label>
                {tooltip}
              </div>
            )}
            <div
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={cnm({
                [cn.wrapperError]: error,
                [cn.wrapperDisabled]: disabled,
                [cn.wrapperFocused]: isFocused && !error && !disabled,
                [cn.wrapperDefault]: !error && !disabled && !isFocused,
              })}
            >
              <div className={cn.dropdownWrapper}>
                <SelectComponent
                  {...field}
                  onChange={innerOnChange}
                  options={options}
                  placeholder={placeholder}
                  isDisabled={disabled}
                  isClearable={isClearable}
                  isSearchable={isSearchable}
                  components={{ ...components }}
                  styles={style}
                />
              </div>
              <hr className={error ? cn.borderError : cn.borderDefault} />
              <button
                type="button"
                disabled={actionDisabled}
                onClick={onClick}
                className={cn.actionBtn}
              >
                <span className={cnm(cn.icon, iconStyles)} />
              </button>
            </div>
            <FieldErrorLabel error={error?.message} dynamicErrorSpace={dynamicErrorSpace} />
          </div>
        );
      }}
    />
  );
};
