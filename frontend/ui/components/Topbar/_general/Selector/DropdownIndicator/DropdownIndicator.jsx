import { components } from 'react-select';
import cn from './DropdownIndicator.module.scss';
import { ArrowDownOutline } from '../../../../_general/icons/ArrowDownOutline.jsx';
import { ArrowUpOutline } from '../../../../_general/icons/ArrowUpOutline.jsx';

export const DropdownIndicator = ({ isOpenMenu, children, ...props }) => (
  <components.DropdownIndicator {...props}>
    <div className={cn.container}>
      {props.selectProps.menuIsOpen ? (
        <button type="button" className={cn.button}>
          <ArrowUpOutline style={cn.icon} />
        </button>
      ) : (
        <button type="button" className={cn.button}>
          <ArrowDownOutline style={cn.icon} />
        </button>
      )}
      {children}
    </div>
  </components.DropdownIndicator>
);
