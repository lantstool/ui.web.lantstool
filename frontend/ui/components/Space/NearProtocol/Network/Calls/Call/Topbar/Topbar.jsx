import cn from './Topbar.module.scss';
import { SideMenu } from './SideMenu/SideMenu.jsx';
import { useMemo } from 'react';

const getFormDefaultValues = (call) => {
  return {
    callId: call.callId,
    name: call.name,
  };
};

export const Topbar = ({ call, callId }) => {
  const formDefaultValues = useMemo(() => getFormDefaultValues(call), [call]);
  const { name } = formDefaultValues;

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{name}</h1>
      <div className={cn.sideMenu}>
        <SideMenu callId={callId} name={name} />
      </div>
    </div>
  );
};
