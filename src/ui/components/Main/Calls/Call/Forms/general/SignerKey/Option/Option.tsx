import { components, OptionProps } from 'react-select';
import cn from './Option.module.css';
import { PermissionLabel } from '../PermissionLabel/PermissionLabel.tsx';

interface Option {
  readonly value: string;
  readonly label: string;
  readonly permission: any;
}

const getText = (publicKey: any) => publicKey.slice('ed25519:'.length);

export const Option = ({ children, ...props }: OptionProps<Option>) => (
  <components.Option {...props}>
    <div className={cn.container}>
      {getText(props.data.value)}
      <PermissionLabel permission={props.data.permission} />
    </div>
  </components.Option>
);
