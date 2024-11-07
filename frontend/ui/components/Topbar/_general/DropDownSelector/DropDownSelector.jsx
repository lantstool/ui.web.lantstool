import cn from './DropDownSelector.module.scss';
import { ArrowUpOutline } from '../../../_general/icons/ArrowUpOutline.jsx';
import { ArrowDownOutline } from '../../../_general/icons/ArrowDownOutline.jsx';

export const DropDownSelector = ({ isOpen, title, children, openMenu }) => (
  <div className={isOpen ? cn.selectActive : cn.select} onClick={openMenu}>
    {children}
    <p className={cn.title}>{title}</p>
    {isOpen ? (
      <button type="button" className={cn.arrow}>
        <ArrowUpOutline style={cn.icon} />
      </button>
    ) : (
      <button type="button" className={cn.arrow}>
        <ArrowDownOutline style={cn.icon} />
      </button>
    )}
  </div>
);
