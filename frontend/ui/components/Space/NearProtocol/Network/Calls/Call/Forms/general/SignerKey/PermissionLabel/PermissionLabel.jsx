import cn from './PermissionLabel.module.scss';
import { useMemo } from 'react';

const types = {
  fullAccess: { text: 'Full Access' },
  functionCall: { text: 'Function Call' },
};

const getType = (permission) =>
  permission === 'FullAccess' ? types.fullAccess : types.functionCall;

export const PermissionLabel = ({ permission }) => {
  const { text } = useMemo(() => getType(permission), [permission]);

  return (
    <div className={cn.permission}>
      <span className={cn.text}>{text}</span>
    </div>
  );
};
