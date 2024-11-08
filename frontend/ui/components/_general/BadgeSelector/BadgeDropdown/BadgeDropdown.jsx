import { useEffect, useRef } from 'react';
import { Badge } from '../../Badge/Badge.jsx';
import { CheckMarkOutline } from '../../icons/CheckmarkOutline.jsx';
import { badgeList } from '../../../../../store/helpers/getRandomBadge.js';
import cn from './BadgeDropdown.module.scss';

export const BadgeDropdown = ({ closeMenu, isOpen, badge, form }) => {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClick = (item) => {
    form.setValue('badge', item);
    closeMenu();
  };

  return (
    <>
      <div ref={ref} className={cn.badgeDropdown}>
        <div className={cn.container}>
          {badgeList.map((item) => (
            <button className={cn.item} type="button" key={item} onClick={() => handleClick(item)}>
              <div className={cn.itemWrapper}>
                <Badge badge={item} />
                <p className={cn.title}>{item}</p>
              </div>
              <CheckMarkOutline style={item === badge ? cn.icon : cn.hidden} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
