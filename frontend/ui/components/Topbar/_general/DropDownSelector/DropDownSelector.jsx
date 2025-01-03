import cn from './DropDownSelector.module.scss';

export const DropDownSelector = ({ isOpen, title, children, openMenu }) => (
  <div className={isOpen ? cn.selectActive : cn.select} onClick={openMenu}>
    {children}
    <p className={cn.title}>{title}</p>
    {isOpen ? (
      <button type="button" className={cn.arrow}>
        <span className={cn.arrowUpIcon} />
      </button>
    ) : (
      <button type="button" className={cn.arrow}>
        <span className={cn.arrowDownIcon} />
      </button>
    )}
  </div>
);
