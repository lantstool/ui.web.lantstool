import { components } from 'react-select';
import cn from './DropdownIndicator.module.scss';
import { ArrowDownOutline } from '../../../icons/ArrowDownOutline.jsx';
import { ArrowUpOutline } from '../../../icons/ArrowUpOutline.jsx';

export const DropdownIndicator = ({ isOpenMenu, children, ...props }) => (
  <components.DropdownIndicator {...props}>
    <div className={cn.container}>
      {props.selectProps.menuIsOpen ? (
        <button disabled={props.isDisabled} type="button" className={cn.button}>
          <ArrowUpOutline style={props.isDisabled ? cn.iconDisabled : cn.iconEnabled} />
        </button>
      ) : (
        <button disabled={props.isDisabled} type="button" className={cn.button}>
          <ArrowDownOutline style={props.isDisabled ? cn.iconDisabled : cn.iconEnabled} />
        </button>
      )}
      {children}
    </div>
  </components.DropdownIndicator>
);
