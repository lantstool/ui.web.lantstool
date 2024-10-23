import cn from './SelectHeadLabel.module.scss';
import { PermissionLabel } from '../PermissionLabel/PermissionLabel.jsx';

export const SelectHeadLabel = ({ permission, text }) => (
  <div className={cn.head}>
    <p className={cn.title}>{text}</p>
    {permission && <PermissionLabel permission={permission?.permission} />}
  </div>
);
