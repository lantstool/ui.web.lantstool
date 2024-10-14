import cn from './SelectGroup.module.css';
import { Select } from '../Select/Select.jsx';

export const SelectGroup = ({ register, id, name, options, label }) => (
  <div className={cn.selectGroup}>
    <label htmlFor={name}>{label}</label>
    <Select register={register} name={name} id={id} options={options} />
  </div>
);
