import cn from './Head.module.css';
import { PermissionLabel } from '../PermissionLabel/PermissionLabel.tsx';

export const Head = ({ permission, text }: any) => {
  return (
    <div className={cn.head}>
      <span>{text}</span>
      {permission && <PermissionLabel permission={permission?.permission} />}
    </div>
  );
};
