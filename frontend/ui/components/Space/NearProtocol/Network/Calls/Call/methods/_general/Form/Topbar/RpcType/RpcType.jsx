import { useStoreEffect } from '@react-vault';
import { useState } from 'react';
import { ServerSquareOutline } from '../../../../../../../../../../_general/icons/ServerSquareOutline.jsx';
import { ArchiveOutline } from '../../../../../../../../../../_general/icons/ArchiveOutline.jsx';
import cn from './RpcType.module.scss';

export const RpcType = ({ call }) => {
  const [toggle, setToggle] = useState(call.rpcType);
  const updateOneRpcType = useStoreEffect((store) => store.nearProtocol.calls.updateOneRpcType);

  const isActive = (type) => toggle === type;
  const onClick = (rpcType) => {
    if (rpcType !== toggle) updateOneRpcType({ rpcType, callId: call.callId });
    setToggle(rpcType);
  };

  return (
    <div className={cn.tab}>
      <button
        onClick={() => onClick('regular')}
        className={isActive('regular') ? cn.activeButton : cn.button}
      >
        <ServerSquareOutline style={cn.icon} />
        Regular
      </button>
      <button
        onClick={() => onClick('archival')}
        className={isActive('archival') ? cn.activeButton : cn.button}
      >
        <ArchiveOutline style={cn.icon} />
        Archival
      </button>
    </div>
  );
};
