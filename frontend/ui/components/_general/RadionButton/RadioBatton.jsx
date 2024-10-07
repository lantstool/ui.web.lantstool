import cn from './RadioButton.module.scss';
import { useState } from 'react';
import cnm from 'classnames';

export const RadioButton = ({ register, label, value, id, disabled }) => {
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
        {...register(id)}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="radio"
        value={value}
        disabled={disabled}
      />
      <span className={cnm(cn.customRadio, { [cn.focused]: isFocused })}></span>
      {label}
    </label>
  );
};
