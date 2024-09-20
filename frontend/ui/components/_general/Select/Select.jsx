import cn from './Select.module.css';

export const Select = ({ register, id, name, options = [] }) => (
  <select {...register(name)} id={id || name} className={cn.select}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
