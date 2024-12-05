import { useStoreEffect } from '@react-vault';
import { useState } from 'react';
import { TabContainer } from '../../../../../../../../../../_general/tab/TabContainer/TabContainer.jsx';
import { TabButton } from '../../../../../../../../../../_general/tab/TabButton/TabButton.jsx';
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
    <TabContainer>
      <TabButton
        isActive={isActive('regular')}
        onClick={() => onClick('regular')}
        Icon={<span className={isActive('regular') ? cn.regularIconBold : cn.regularIcon} />}
      >
        Regular
      </TabButton>
      <TabButton
        isActive={isActive('archival')}
        onClick={() => onClick('archival')}
        Icon={<span className={isActive('archival') ? cn.archivalIconBold : cn.archivalIcon} />}
      >
        Archival
      </TabButton>
    </TabContainer>
  );
};
