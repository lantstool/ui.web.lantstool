import { BackspaceOutline } from '../icons/BackspaceOutline.jsx';
import { CopyButton } from '../CopyButton/CopyButton.jsx';
import { useController } from 'react-hook-form';
import { useRef } from 'react';
import cnm from 'classnames';
import cn from './Input.module.scss';

export const Input = ({
  control,
  id,
  name,
  placeholder,
  label,
  error = false,
  type = 'text',
  disabled = false,
  onBlur = () => ({}),
  copy = true,
}) => {
  const ref = useRef(null);
  const {
    field: { value = '', onChange },
  } = useController({
    name,
    control,
  });

  const handleClear = () => {
    ref.current.focus();
    onChange('');
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className={cn.container}>
      <label className={cn.label}>{label}</label>
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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={error ? cn.errorInput : cn.input}
          type={type}
          disabled={disabled}
        />
        {!disabled && value && (
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
            {copy && <CopyButton disabled={disabled} value={value} />}
          </div>
        )}
      </div>
      <div className={cn.errorWrapper}>{error && <p className={cn.error}>{error}</p>}</div>
    </div>
  );
};
