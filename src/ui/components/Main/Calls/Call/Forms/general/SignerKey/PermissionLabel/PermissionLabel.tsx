import cn from './PermissionLabel.module.css';
import { useMemo } from 'react';

const types: any = {
  fullAccess: { text: 'Full Access' },
  functionCall: { text: 'Function Call' },
};

const getType = (permission: any) =>
  permission === 'FullAccess' ? types.fullAccess : types.functionCall;

export const PermissionLabel = ({ permission }: any) => {
  const { text } = useMemo(() => getType(permission), [permission]);

  return (
    <div className={cn.permission}>
      <span className={cn.text}>{text}</span>
    </div>
  );
};
