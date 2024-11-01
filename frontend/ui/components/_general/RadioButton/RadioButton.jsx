import cn from './RadioButton.module.scss';
import { useState } from 'react';
import cnm from 'classnames';

export const RadioButton = ({ register, label, value, name, disabled }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <label className={cn.radioContainer}>
      <input
        {...register(name)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="radio"
        value={value}
        disabled={disabled}
      />
      <span className={cnm(cn.customRadio, { [cn.focused]: isFocused })}></span>
      <span className={cnm(cn.enabledText, { [cn.disabledText]: disabled })}>{label}</span>
    </label>
  );
};
