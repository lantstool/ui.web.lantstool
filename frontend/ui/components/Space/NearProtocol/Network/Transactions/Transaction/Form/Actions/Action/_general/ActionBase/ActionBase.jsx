import { Label } from '../../../../../../../../../../_general/Label/Label.jsx';
import { Tooltip } from '../../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import cn from './ActionBase.module.scss';

export const ActionBase = ({ children, label, iconStyle, removeAction, order, color, tooltipContent }) => (
  <div className={cn.actionBase}>
    <div className={cn.topbar}>
      <div className={cn.container}>
        <p className={cn.order}>#{order}</p>
        <Label iconStyles={iconStyle} color={color}>{label}</Label>
        <Tooltip content={tooltipContent} defaultContent placement="top" />
      </div>
      <Button color="tertiary" size="small" onClick={removeAction} iconLeftStyles={cn.deleteIcon} />
    </div>
    <div className={cn.action}>{children}</div>
  </div>
);
