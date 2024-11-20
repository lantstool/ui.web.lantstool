import { useStoreEffect } from '@react-vault';
import { Button } from '../../../../../../../../../../_general/Button/Button.jsx';
import { CodeCircleOutline } from '../../../../../../../../../../_general/icons/CodeCircleOutline.jsx';

export const RpcType = ({ call }) => {
  const updateOneRpcType = useStoreEffect((store) => store.nearProtocol.calls.updateOneRpcType);
  const onClick = () => updateOneRpcType(call);

  return (
    <Button size="medium" onClick={onClick} color="secondary" IconLeft={CodeCircleOutline}>
      {call.rpcType}
    </Button>
  );
};
