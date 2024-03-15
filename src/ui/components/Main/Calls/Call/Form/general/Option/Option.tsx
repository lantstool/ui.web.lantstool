import { components, OptionProps } from 'react-select';
import cn from './Option.module.css';
import { PermissionLabel } from '../PermissionLabel/PermissionLabel.tsx';

interface Option {
  readonly value: string;
  readonly label: string;
  readonly type: any;
}

export const Option = ({ children, ...props }: OptionProps<Option>) => (
  <components.Option {...props}>
    <div className={cn.container}>
      {props.data.value}
      <PermissionLabel permission={props.data.type} />
    </div>
  </components.Option>
);
