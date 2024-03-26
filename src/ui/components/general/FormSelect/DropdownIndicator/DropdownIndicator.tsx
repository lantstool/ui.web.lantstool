import { components } from 'react-select';
import cn from './DropdownIndicator.module.css';
import { ArrowDownIcon } from '../../../../assets/components/ArrowDownIcon.tsx';
import cnm from 'classnames';

export const DropdownIndicator = ({ children, ...props }: any) => (
  <components.DropdownIndicator {...props}>
    <div className={cn.container}>
      <button className={cn.button} type="button">
        <ArrowDownIcon style={cnm(cn.icon, props.isFocused && cn.focused)} />
      </button>
      {children}
    </div>
  </components.DropdownIndicator>
);
