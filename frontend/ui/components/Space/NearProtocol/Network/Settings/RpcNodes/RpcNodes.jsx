import { Button } from '../../../../../_general/Button/Button.jsx';
import cn from './RpcNodes.module.scss';

export const RpcNodes = () => {
  return (
    <div className={cn.rpcNodes}>
      <div className={cn.topbar}>
        <h1 className={cn.title}>RPC Nodes</h1>
        <Button size="medium" color="secondary" IconLeft={() => <span className={cn.addIcon} />}>
          Add RPC
        </Button>
      </div>
      <div className={cn.card}>
        dd
      </div>
    </div>
  );
};
