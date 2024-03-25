import cn from './SelectHeadLabel.module.css';
import { PermissionLabel } from '../PermissionLabel/PermissionLabel.tsx';

export const SelectHeadLabel = ({ permission, text }: any) => {
  return (
    <div className={cn.head}>
      <span>{text}</span>
      {permission && <PermissionLabel permission={permission} />}
    </div>
  );
};
