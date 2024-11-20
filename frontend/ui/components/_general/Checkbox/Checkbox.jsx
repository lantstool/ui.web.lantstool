import cn from './Checkbox.module.scss';

export const Checkbox = ({ register, name, disable = false, onChange = () => ({}) }) => (
  <label className={cn.checkbox}>
    <input
      {...register(name)}
      onChange={onChange}
      disabled={disable}
      className={cn.input}
      type="checkbox"
    />
    <span className={cn.checkmark}></span>
  </label>
);
