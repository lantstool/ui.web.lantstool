import { useStoreEffect } from '@react-vault';
import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { useState } from 'react';
import { CodeCircleOutline } from '../../../../../../../../../../_general/icons/CodeCircleOutline.jsx';
import { TabButtons } from '../../../../../../../../../../_general/TabButtons/TabButtons.jsx';

export const RpcType = ({ call }) => {
  console.log(call.rpcType);
  const updateOneRpcType = useStoreEffect((store) => store.nearProtocol.calls.updateOneRpcType);
  const onClick = () => updateOneRpcType(call);
  const [toggle, setToggle] = useState(call.rpcType);

  const changeToggle = () => setToggle(call.rpcType);
  return (
    <TabButtons toggle={toggle} changeToggle={changeToggle}>
      {/*<button value='archival'>Archival</button>*/}
      {/*<button value='regular'>Regular</button*/}
    </TabButtons>

  );
};
