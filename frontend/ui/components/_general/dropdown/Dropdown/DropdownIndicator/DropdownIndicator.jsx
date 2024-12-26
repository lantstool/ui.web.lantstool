import { components } from 'react-select';
import cn from './DropdownIndicator.module.scss';
import { ArrowDownOutline } from '../../../icons/ArrowDownOutline.jsx';
import { ArrowUpOutline } from '../../../icons/ArrowUpOutline.jsx';

export const DropdownIndicator = ({ isOpenMenu, children, isDisabled, ...props }) => {
  if (isDisabled) return null;
  return (
    <components.DropdownIndicator {...props}>
      <div className={cn.container}>
        {props.selectProps.menuIsOpen ? (
          <button disabled={isDisabled} type="button" className={cn.button}>
            <ArrowUpOutline style={isDisabled ? cn.iconDisabled : cn.iconEnabled} />
          </button>
        ) : (
          <button disabled={isDisabled} type="button" className={cn.button}>
            <ArrowDownOutline style={isDisabled ? cn.iconDisabled : cn.iconEnabled} />
          </button>
        )}
        {children}
      </div>
    </components.DropdownIndicator>
  );
};
