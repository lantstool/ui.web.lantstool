import { Tooltip } from '../Tooltip/Tooltip.jsx';
import cn from './FieldTopbarLabel.module.scss';

export const FieldTopbarLabel = ({ label, tooltip }) => (
  <div className={cn.label}>
    <p className={cn.title}>{label}</p>
    {tooltip && <Tooltip content={tooltip} placement="top" defaultContent />}
  </div>
);
