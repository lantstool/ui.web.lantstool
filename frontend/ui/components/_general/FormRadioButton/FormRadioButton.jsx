import { useState } from 'react';
import { useController } from 'react-hook-form';
import cnm from 'classnames';
import cn from './FormRadioButton.module.scss';

export const FormRadioButton = ({ control, value, label, name, disabled = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    field: { value: fieldValue, onChange, onBlur },
  } = useController({ name, control });

  const id = `${name}-${value}`;

  const handleChange = () => onChange(value);
  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <div className={cn.radioButton}>
      <div className={cn.radioContainer}>
        <input
          id={id}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="radio"
          disabled={disabled}
          checked={value === fieldValue}
        />
        <span
          className={cnm(cn.customRadio, {
            [cn.focused]: isFocused,
            [cn.disabled]: disabled,
          })}
        />
      </div>
      {label && (
        <label htmlFor={id} className={disabled ? cn.disabledText : cn.enabledText}>
          {label}
        </label>
      )}
    </div>
  );
};
