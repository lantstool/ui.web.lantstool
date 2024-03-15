import cnm from 'classnames';
import cn from './PermissionLabel.module.css';
import { useMemo } from 'react';

const types: any = {
  change: { text: 'Change', className: cn.change },
  view: { text: 'View', className: cn.view },
};

const getType = (permission: any) =>
  permission === 'change' ? types.change : types.view;

export const PermissionLabel = ({ permission }: any) => {
  const { text, className } = useMemo(() => getType(permission), [permission]);

  return (
    <div className={cnm(cn.permission, className)}>
      <span className={cn.text}>{text}</span>
    </div>
  );
};
