import cnm from 'classnames';
import { FieldErrorLabel } from '../FieldErrorLabel/FieldErrorLabel.jsx';
import { CopyButton } from '../CopyButton/CopyButton.jsx';
import { useController } from 'react-hook-form';
import cn from './Textarea.module.scss';

export const Textarea = ({
  control,
  name,
  id,
  placeholder,
  cols,
  rows,
  disabled = false,
  error = false,
  dynamicErrorSpace = false,
  copy = false,
  classes = {},
}) => {
  const {
    field: { value = '', onChange, onBlur, ref },
  } = useController({
    name,
    control,
  });

  const handleClear = () => {
    onChange('');
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  return (
    <div className={cnm(cn.container, classes?.container && classes.container)}>
      <div
        className={cnm({
          [cn.wrapper]: !error && !disabled,
          [cn.wrapperDisabled]: disabled,
          [cn.wrapperError]: error,
        })}
      >
        <textarea
          className={error ? cn.errorTextarea : copy ? cn.fullSize : cn.partSize}
          ref={ref}
          id={id || name}
          placeholder={disabled ? '' : placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          cols={cols}
          rows={rows}
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
              <span className={cn.icon} />
            </button>
            {copy && <CopyButton disabled={disabled} value={value} />}
          </div>
        )}
      </div>
      <FieldErrorLabel error={error} dynamicErrorSpace={dynamicErrorSpace} />
    </div>
  );
};
