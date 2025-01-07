import { components } from 'react-select';
import cn from './Option.module.scss';

export const Option = ({ ...props }) => (
  <components.Option {...props}>
    <div className={cn.container}>
      {props.data.label}
      <span
        className={props.selectProps.value?.label === props.data?.label ? cn.icon : cn.hidden}
      />
    </div>
  </components.Option>
);
