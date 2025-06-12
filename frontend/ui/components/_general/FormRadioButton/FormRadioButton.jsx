import { useController } from 'react-hook-form';
import cn from './FormRadioButton.module.scss';

export const FormRadioButton = ({ control, value, label, name, disabled = false }) => {
  const {
    field: { value: fieldValue, onChange },
  } = useController({ name, control });

  const id = `${name}-${value}`;

  const handleChange = () => onChange(value);

  return (
    <div className={cn.radioButton}>
      <div className={cn.radioContainer}>
        <input
          id={id}
          onChange={handleChange}
          type="radio"
          disabled={disabled}
          checked={value === fieldValue}
        />
        <label htmlFor={id} className={cn.customRadio} />
      </div>
      {label && (
        <label htmlFor={id} className={disabled ? cn.disabledText : cn.enabledText}>
          {label}
        </label>
      )}
    </div>
  );
};
