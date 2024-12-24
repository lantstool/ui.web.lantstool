import { components } from 'react-select';
import cn from './Option.module.scss';

export const Option = ({ ...props }) => (
  <components.Option {...props}>
    <div className={cn.container}>
      <div className={cn.singleOption}>
        {props.data.label}
      </div>
      {props.selectProps.value?.label === props.data?.label && <span className={cn.icon} />}
    </div>
  </components.Option>
);
