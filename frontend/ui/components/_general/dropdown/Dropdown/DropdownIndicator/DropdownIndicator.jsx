import { components } from 'react-select';
import cn from './DropdownIndicator.module.scss';

export const DropdownIndicator = ({ isOpenMenu, children, isDisabled, ...props }) => {
  if (isDisabled) return null;
  return (
    <components.DropdownIndicator {...props}>
      <div className={cn.container}>
        {props.selectProps.menuIsOpen ? (
          <button disabled={isDisabled} type="button" className={cn.button}>
            <span className={isDisabled ? cn.arrowUpDisabledIcon : cn.arrowUpIcon} />
          </button>
        ) : (
          <button disabled={isDisabled} type="button" className={cn.button}>
            <span className={isDisabled ? cn.arrowDownDisabledIcon : cn.arrowDownIcon} />
          </button>
        )}
        {children}
      </div>
    </components.DropdownIndicator>
  );
};
