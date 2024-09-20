import css from './Input.module.css';

export const Input = ({
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
