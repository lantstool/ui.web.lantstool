import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import { CopyButton } from '../../CopyButton/CopyButton.jsx';
import { useController } from 'react-hook-form';
import cnm from 'classnames';
import cn from './FormInput.module.scss';

export const FormInput = ({
  control,
  id,
  name,
  placeholder,
  label,
  type = 'text',
  disabled = false,
  onChange,
  onBlur = () => ({}),
  copy = true,
  tooltip = null,
  dynamicErrorSpace = false,
  errorExtractor = (error) => error?.message,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { value, onBlur: fieldOnBlur, ref } = field;
  const innerOnChange = onChange ? onChange(field) : field.onChange;

  // We want to avoid React error when value is null
  const val = typeof value !== 'string' ? '' : value;

  const handleClear = () => {
    innerOnChange('');
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleBlur = () => {
    fieldOnBlur();
    onBlur();
  };

  return (
    <div className={cn.container}>
      {label && (
        <div className={cn.labelWrapper}>
          <label className={cn.label}>{label}</label>
          {tooltip}
        </div>
      )}

      <div
        className={cnm({
          [cn.wrapper]: !error && !disabled,
          [cn.wrapperDisabled]: disabled,
          [cn.wrapperError]: error,
        })}
      >
        <input
          ref={ref}
          id={id || name}
          placeholder={disabled ? '' : placeholder}
          value={val}
          onChange={innerOnChange}
          onBlur={handleBlur}
          className={error ? cn.errorInput : cn.input}
          type={type}
          disabled={disabled}
        />
        {!disabled && val && (
          <div className={cn.buttonWrapper}>
            <button
              onMouseDown={handleMouseDown}
              disabled={disabled}
              type="button"
              onClick={handleClear}
              className={cn.button}
            >
              <span className={cn.icon} />
            </button>
            {copy && <CopyButton disabled={disabled} value={val} />}
          </div>
        )}
      </div>
      <FieldErrorLabel error={errorExtractor(error)} dynamicErrorSpace={dynamicErrorSpace} />
    </div>
  );
};
