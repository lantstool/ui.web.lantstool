import css from './InputDPR.module.css';

export const InputDPR = ({
  register = () => ({}),
  id,
  name,
  placeholder,
  textarea = false,
  cols,
  rows,
  type = 'text',
  disabled = false,
}) =>
  textarea ? (
    <textarea
      {...register(name)}
      id={id || name}
      placeholder={placeholder}
      cols={cols}
      rows={rows}
      className={`${css.input} ${css.textarea}`}
      disabled={disabled}
    />
  ) : (
    <input
      {...register(name)}
      id={id || name}
      placeholder={placeholder}
      className={css.input}
      type={type}
      disabled={disabled}
    />
  );
