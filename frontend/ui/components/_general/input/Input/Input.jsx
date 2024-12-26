import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import { BackspaceOutline } from '../../icons/BackspaceOutline.jsx';
import { CopyButton } from '../../CopyButton/CopyButton.jsx';
import { useController } from 'react-hook-form';
import cnm from 'classnames';
import cn from './Input.module.scss';

export const Input = ({
  control,
  id,
  name,
  placeholder,
  label,
  type = 'text',
  disabled = false,
  onBlur = () => ({}),
  copy = true,
  tooltip = null,
  dynamicErrorSpace = false,
}) => {
  const {
    field: { value, onChange: fieldOnChange, onBlur: fieldOnBlur, ref },
    fieldState: { error },
  } = useController({ name, control });

  // We want to avoid React error when value is null
  const val = typeof value !== 'string' ? '' : value;

  const handleClear = () => {
    fieldOnChange('');
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
          onChange={fieldOnChange}
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
              <BackspaceOutline style={cn.icon} />
            </button>
            {copy && <CopyButton disabled={disabled} value={val} />}
          </div>
        )}
      </div>
      <FieldErrorLabel error={error?.message} dynamicErrorSpace={dynamicErrorSpace} />
    </div>
  );
};
