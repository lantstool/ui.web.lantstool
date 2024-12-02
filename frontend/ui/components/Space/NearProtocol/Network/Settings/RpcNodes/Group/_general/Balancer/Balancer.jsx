import { useStoreEffect } from '@react-vault';
import { useParams } from 'react-router-dom';
import { Toggle } from '../../../../../../../../_general/Toggle/Toggle.jsx';
import cn from './Balancer.module.scss';

export const Balancer = ({ rpcType, autoBalance }) => {
  const { spaceId, networkId } = useParams();
  const updateActiveRpc = useStoreEffect((store) => store.nearProtocol.networks.updateActiveRpc);

  const onChange = () => {
    if (autoBalance) return;
    updateActiveRpc({ spaceId, networkId, rpcType, autoBalance: true, rpc: null });
  };

  return (
    <div className={cn.balancerWrapper}>
      <Toggle
        value={autoBalance}
        onChange={onChange}
        labelText="Balancer"
        tooltip={{
          content: (
            <p className={cn.tooltipText}>
              Balancer allows the app to balance the load across all RPC nodes instead of sending
              all requests to a single node. It is <b>recommended</b> to keep it <b>ON</b> in most
              cases.
            </p>
          ),
          placement: 'top',
        }}
      />
    </div>
  );
};
