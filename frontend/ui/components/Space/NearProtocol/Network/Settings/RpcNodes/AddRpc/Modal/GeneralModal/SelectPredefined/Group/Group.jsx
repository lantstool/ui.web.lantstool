import { PredefinedRpc } from './PredefinedRpc/PredefinedRpc.jsx';
import cn from './Group.module.scss';

export const Group = ({ list, title, selectedRpc, selectRpc, rpcType }) => {
  if (list.length === 0) return null;

  return (
    <div className={cn.group}>
      <h2 className={cn.title}>{title}</h2>
      {list.map((rpc) => (
        <PredefinedRpc
          key={rpc.id}
          rpc={rpc}
          selectedRpc={selectedRpc}
          selectRpc={selectRpc}
          rpcType={rpcType}
        />
      ))}
    </div>
  );
};
