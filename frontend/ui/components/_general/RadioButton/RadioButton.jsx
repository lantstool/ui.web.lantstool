import { useState } from 'react';
import cnm from 'classnames';
import cn from './RadioButton.module.scss';

export const RadioButton = ({ register, label, value, name, disabled = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={cn.radioButton}>
      <label className={cn.radioContainer}>
        <input
          {...register(name)}
          id={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="radio"
          value={value}
          disabled={disabled}
        />
        <span
          className={cnm(cn.customRadio, {
            [cn.focused]: isFocused,
            [cn.disabled]: disabled,
          })}
        />
      </label>
      <label htmlFor={value} className={disabled ? cn.disabledText : cn.enabledText}>
        {label}
      </label>
    </div>
  );
};
