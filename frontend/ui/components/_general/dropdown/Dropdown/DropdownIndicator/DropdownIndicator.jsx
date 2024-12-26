import { components } from 'react-select';
import cn from './DropdownIndicator.module.scss';

export const DropdownIndicator = ({ isOpenMenu, children, ...props }) => (
  <components.DropdownIndicator {...props}>
    <div className={cn.container}>
      {props.selectProps.menuIsOpen ? (
        <button disabled={props.isDisabled} type="button" className={cn.button}>
          <span className={props.isDisabled ? cn.arrowUpDisabledIcon : cn.arrowUpIcon} />
        </button>
      ) : (
        <button disabled={props.isDisabled} type="button" className={cn.button}>
          <span className={props.isDisabled ? cn.arrowDownDisabledIcon : cn.arrowDownIcon} />
        </button>
      )}
      {children}
    </div>
  </components.DropdownIndicator>
);
