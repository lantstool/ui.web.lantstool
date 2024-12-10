import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { Balancer } from './_general/Balancer/Balancer.jsx';
import { PredefinedRpc } from './PredefinedRpc/PredefinedRpc.jsx';
import { UserCreatedRpc } from './UserCreatedRpc/UserCreatedRpc.jsx';
import cn from './Group.module.scss';

export const Group = ({
  rpcType,
  groupRpcList,
  groupActiveRpc,
  title,
  description,
  isLastRpcInList,
}) => {
  const { spaceId, networkId } = useParams();
  const updateActiveRpc = useStoreEffect((store) => store.nearProtocol.networks.updateActiveRpc);

  if (groupRpcList.length === 0) return null;

  return (
    <div>
      <h2 className={cn.title}>{title}</h2>
      <p className={cn.description}>{description}</p>
      <Balancer rpcType={rpcType} autoBalance={groupActiveRpc.autoBalance} />
      <div className={cn.rpcList}>
        {groupRpcList.map((rpc) => {
          const Rpc = rpc.isPredefined ? PredefinedRpc : UserCreatedRpc;
          return (
            <Rpc
              key={rpc.id}
              rpc={rpc}
              groupActiveRpc={groupActiveRpc}
              rpcType={rpcType}
              spaceId={spaceId}
              networkId={networkId}
              updateActiveRpc={updateActiveRpc}
              isLastRpcInList={isLastRpcInList}
            />
          );
        })}
      </div>
    </div>
  );
};
