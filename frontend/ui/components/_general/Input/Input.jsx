import cn from './Input.module.scss';
import { BackspaceOutline } from '../icons/BackspaceOutline.jsx';
import { CopyButton } from '../CopyButton/CopyButton.jsx';

export const Input = ({
  register = () => ({}),
  value,
  id,
  name,
  placeholder,
  label,
  copy,
  clear,
  error = false,
  type = 'text',
  disabled = false,
}) => {
  return (
    <div className={cn.container}>
      <label className={cn.label}>{label}</label>
      <input
        {...register(name)}
        id={id || name}
        placeholder={placeholder}
        className={error ? cn.errorInput : cn.input}
        type={type}
        value={value}
        disabled={disabled}
      />
      <div className={cn.buttonWrapper}>
        <button disabled={disabled} type="button" onClick={clear} className={cn.button}>
          <BackspaceOutline style={cn.icon} />
        </button>
        <CopyButton disabled={disabled} copy={copy} />
      </div>
    </div>
  );
};
