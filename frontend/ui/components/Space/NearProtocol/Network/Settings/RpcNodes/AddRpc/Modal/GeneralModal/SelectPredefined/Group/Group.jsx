import { PredefinedRpc } from './PredefinedRpc/PredefinedRpc.jsx';
import cn from './Group.module.scss';

export const Group = ({ list, title, selectedRpcId, selectRpc }) => {
  if (list.length === 0) return null;
  return (
    <div className={cn.group}>
      <h2 className={cn.title}>{title}</h2>
      {list.map((rpc) => (
        <PredefinedRpc key={rpc.id} rpc={rpc} selectedRpcId={selectedRpcId} selectRpc={selectRpc} />
      ))}
    </div>
  );
};
