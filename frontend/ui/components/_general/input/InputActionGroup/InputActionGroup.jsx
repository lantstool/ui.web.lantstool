import { Controller, useController } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './InputActionGroup.style.js';
import { DropdownIndicator } from '../../dropdown/Dropdown/DropdownIndicator/DropdownIndicator.jsx';
import { Option } from '../../dropdown/Dropdown/Option/Option.jsx';
import { CopyButton } from '../../CopyButton/CopyButton.jsx';
import { useRef, useState } from 'react';
import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import cnm from 'classnames';
import cn from './InputActionGroup.module.scss';

export const InputActionGroup = ({
  control = () => ({}),
  options = [],
  name,
  dropDownName = null,
  label,
  placeholder = null,
  disabled = false,
  copy,
  type = 'text',
  inputGroup = 'dropdown',
  singleValue = null,
  dynamicErrorSpace = false,
  tooltip,
}) => {
  const ref = useRef(null);
  const {
    field: { value, onChange: fieldOnChange },
    fieldState: { error },
  } = useController({ name, control });

  // We want to avoid React error when value is null
  const val = typeof value !== 'string' ? '' : value;

  const styles = selectStyles(error);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    fieldOnChange('');
    ref.current.focus();
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={cn.container}>
      <div className={cn.head}>
        <label className={cn.label}>{label}</label>
        {tooltip}
      </div>
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
        <div
          className={cnm(cn.inputWrapper, inputGroup === 'text' && !singleValue && cn.inputBorder)}
        >
          <input
            ref={ref}
            id={name}
            onChange={fieldOnChange}
            value={val}
            placeholder={disabled ? '' : placeholder}
            className={cnm(cn.input, inputGroup === 'text' && !singleValue && cn.inputBorder)}
            type={type}
            disabled={disabled}
          />
          {!disabled && value && (
            <div className={cn.buttonWrapper}>
              <button disabled={disabled} type="button" onClick={handleClear} className={cn.button}>
                <span className={cn.icon} />
              </button>
              {copy && <CopyButton disabled={disabled} value={value} />}
            </div>
          )}
        </div>
        {(inputGroup === 'dropdown' || singleValue) && (
          <hr className={error ? cn.borderError : cn.borderDefault} />
        )}
        {inputGroup === 'dropdown' && (
          <Controller
            name={dropDownName}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isSearchable={false}
                isDisabled={disabled}
                options={options}
                styles={styles}
                components={{ DropdownIndicator, Option }}
              />
            )}
          />
        )}
        {inputGroup === 'text' && singleValue && (
          <div className={cn.wrapper}>
            <h2 className={cn.singleValue}>{singleValue}</h2>
          </div>
        )}
      </div>
      <FieldErrorLabel error={error} dynamicErrorSpace={dynamicErrorSpace} />
    </div>
  );
};
