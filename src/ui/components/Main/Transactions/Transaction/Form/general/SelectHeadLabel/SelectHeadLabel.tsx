import cn from './SelectHeadLabel.module.css';
import { PermissionLabel } from '../PermissionLabel/PermissionLabel.tsx';

export const SelectHeadLabel = ({ permission, text }: any) => {
  return (
    <div className={cn.head}>
      <p className={cn.title}>{text}</p>
      {permission && <PermissionLabel permission={permission?.permission} />}
    </div>
  );
};
