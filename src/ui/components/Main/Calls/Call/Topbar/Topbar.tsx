import cn from './Topbar.module.css';
import { SideMenu } from './SideMenu/SideMenu.tsx';
import { useMemo } from 'react';

const getFormDefaultValues = (call: any) => {
  return {
    callId: call.callId,
    name: call.name,
  };
};

export const Topbar = ({ call }: any) => {
  const formDefaultValues = useMemo(() => getFormDefaultValues(call), [call]);
  const { callId, name } = formDefaultValues;

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{name}</h1>
      {/*<div className={cn.sideMenu}>*/}
      {/*  <SideMenu callId={callId} />*/}
      {/*</div>*/}
    </div>
  );
};
