import { Group } from './Group/Group.jsx';
import { AddRpc } from './AddRpc/AddRpc.jsx';
import cn from './RpcNodes.module.scss';

export const RpcNodes = ({ network }) => (
  <div className={cn.rpcNodes}>
    <div className={cn.topbar}>
      <h1 className={cn.title}>RPC Nodes</h1>
      <AddRpc />
    </div>
    <div className={cn.card}>
      <Group
        rpcType="regular"
        groupRpcList={network.rpcList.regular}
        groupActiveRpc={network.activeRpc.regular}
        title="Regular"
        description="Access the latest blockchain state for fast, current data requests"
      />
      <Group
        rpcType="archival"
        groupRpcList={network.rpcList.archival}
        groupActiveRpc={network.activeRpc.archival}
        title="Archival"
        description="Access complete blockchain history for detailed past data and analytics"
      />
    </div>
  </div>
);
