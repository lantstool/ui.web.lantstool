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
      <h2 className={disabled ? cn.disabledText : cn.enabledText}>{label}</h2>
    </div>
  );
};
