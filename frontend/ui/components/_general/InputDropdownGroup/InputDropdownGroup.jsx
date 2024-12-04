import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './InputDropdownGroup.style.js';
import { DropdownIndicator } from '../Dropdown/DropdownIndicator/DropdownIndicator.jsx';
import { BackspaceOutline } from '../icons/BackspaceOutline.jsx';
import { CopyButton } from '../CopyButton/CopyButton.jsx';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import cnm from 'classnames';
import cn from './InputDropdownGroup.module.scss';

export const InputDropdownGroup = ({
  register = () => ({}),
  control = () => ({}),
  options,
  name,
  id,
  dropDownName,
  label,
  placeholder = null,
  disabled = false,
  error = false,
  clear = false,
  copy = false, // copy={getValues('name')}
  type = 'text',
}) => {
  const styles = selectStyles(error);
  const [isFocused, setIsFocused] = useState(false);
  const value = useWatch({
    control,
    name,
  });
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={cn.container}>
      <label className={cn.label}>{label}</label>
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
        <div className={cn.inputWrapper}>
          <input
            {...register(name)}
            id={id || name}
            placeholder={placeholder}
            className={cn.input}
            type={type}
            disabled={disabled}
          />
          {!disabled && value && (
            <div className={cn.buttonWrapper}>
              <button disabled={disabled} type="button" onClick={clear} className={cn.button}>
                <BackspaceOutline style={cn.icon} />
              </button>
              <CopyButton disabled={disabled} value={copy} />
            </div>
          )}
        </div>
        <hr className={error ? cn.borderError : cn.borderDefault} />
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
              components={{ DropdownIndicator }}
            />
          )}
        />
      </div>
    </div>
  );
};
