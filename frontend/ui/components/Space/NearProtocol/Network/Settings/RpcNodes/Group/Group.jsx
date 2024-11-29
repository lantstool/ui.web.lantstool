import { Balancer } from './Balancer/Balancer.jsx';
import { PredefinedRpc } from './PredefinedRpc/PredefinedRpc.jsx';
import { UserCreatedRpc } from './UserCreatedRpc/UserCreatedRpc.jsx';
import cn from './Group.module.scss';

export const Group = ({ rpcType, rpcList, activeRpc, description }) => {
  return (
    <div>
      <h2 className={cn.title}>Regular</h2>
      <p className={cn.description}>{description}</p>
      <Balancer rpcType={rpcType} autoBalance={activeRpc.autoBalance} />
      <div className={cn.rpcList}>
        {rpcList.map((rpc) =>
          rpc.isPredefined ? (
            <PredefinedRpc key={rpc.id} rpc={rpc} />
          ) : (
            <UserCreatedRpc key={rpc.id} rpc={rpc} />
          ),
        )}
      </div>
    </div>
  );
};
