import { Button } from '../../../../../_general/Button/Button.jsx';
import { Group } from './Group/Group.jsx';
import cn from './RpcNodes.module.scss';

export const RpcNodes = ({ network }) => {
  return (
    <div className={cn.rpcNodes}>
      <div className={cn.topbar}>
        <h1 className={cn.title}>RPC Nodes</h1>
        <Button size="medium" color="secondary" IconLeft={() => <span className={cn.addIcon} />}>
          Add RPC
        </Button>
      </div>
      <div className={cn.card}>
        <Group
          rpcType="regular"
          rpcList={network.rpcList.regular}
          activeRpc={network.activeRpc.regular}
          description="Access the latest blockchain state for fast, current data requests"
        />
      </div>
    </div>
  );
};
