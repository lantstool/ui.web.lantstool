import css from './Input.module.css';

type Props = {
  register?: any;
  id?: string;
  name: string;
  placeholder?: string;
  textarea?: boolean;
  cols?: number;
  rows?: number;
  type?: string;
  disabled?: boolean;
};

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
}: Props) =>
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
