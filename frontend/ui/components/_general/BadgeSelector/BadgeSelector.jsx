import { BadgeDropdown } from './BadgeDropdown/BadgeDropdown.jsx';
import { Button } from '../Button/Button.jsx';
import { useState } from 'react';
import { Badge } from '../Badge/Badge.jsx';
import cn from './BadgeSelector.module.scss';

export const BadgeSelector = ({ form, size = 'large', type = 'button', spaceId = null }) => {
  const [isOpen, setOpen] = useState(false);
  const badge = form.watch('badge');

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return (
    <div className={cn.badge}>
      <Button
        size={size}
        onClick={openMenu}
        color="secondary"
        iconRightStyles={isOpen ? cn.arrowUpIcon : cn.arrowDownIcon}
      >
        <Badge badge={badge} />
      </Button>
      <BadgeDropdown
        spaceId={spaceId}
        isOpen={isOpen}
        closeMenu={closeMenu}
        form={form}
        badge={badge}
        type={type}
      />
    </div>
  );
};
