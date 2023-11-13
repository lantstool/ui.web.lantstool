import cn from './SelectGroup.module.css';
import { Select } from '../Select/Select.tsx';

export const SelectGroup = ({ register, id, name, options, label }: any) => (
  <div className={cn.selectGroup}>
    <label htmlFor={name}>{label}</label>
    <Select register={register} name={name} id={id} options={options} />
  </div>
);
