import { useEffect, useRef } from 'react';
import { Badge } from '../../Badge/Badge.jsx';
import { CheckMarkOutline } from '../../icons/CheckmarkOutline.jsx';
import { badgeList } from '../../../../../store/helpers/getRandomBadge.js';
import { useStoreEffect } from '@react-vault';
import cn from './BadgeDropdown.module.scss';

export const BadgeDropdown = ({ closeMenu, isOpen, badge, form, type, spaceId }) => {
  const updateOneBadge = useStoreEffect((store) => store.spaces.updateOneBadge);
  const ref = useRef(null);
  const { setValue } = form;

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
    setValue('badge', item);
    if (type === 'submit' && badge !== item) {
      updateOneBadge({ spaceId, badge: item });
    }
    closeMenu();
  };

  return (
    <>
      <div ref={ref} className={spaceId ? cn.badgeDropdown : cn.badgeDropdownResized}>
        <div className={cn.scrollBar}>
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
