import cnm from 'classnames';
import cn from './PermissionLabel.module.css';
import { useMemo } from 'react';

const types: any = {
  fullAccess: { text: 'Full Access', className: cn.fullAccess },
  functionCall: { text: 'Function Call', className: cn.functionCall },
};

const getType = (permission: any) =>
  permission === 'FullAccess' ? types.fullAccess : types.functionCall;

export const PermissionLabel = ({ permission }: any) => {
  const { text, className } = useMemo(() => getType(permission), [permission]);

  return (
    <div className={cnm(cn.permission, className)}>
      <span className={cn.text}>{text}</span>
    </div>
  );
};
