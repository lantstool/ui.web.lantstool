import { Button } from '@gc/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useNetworkId } from '@hooks/useNetworkId.js';
import cn from './Tip.module.scss';

export const Tip = () => {
  const { spaceId, networkId } = useNetworkId();
  const navigate = useNavigate();

  const onClick = () =>
    navigate(`/space/${spaceId}/near-protocol/${networkId}/accounts?modal=create`);

  return (
    <div className={cn.tip}>
      <div className={cn.tipContainer}>
        <div className={cn.tipWrapper}>
          <div className={cn.tipIcon} />
          <h2 className={cn.tipTitle}>Tip</h2>
        </div>
        <p className={cn.tipText}>Create new account for testnet network.</p>
      </div>
      <Button onClick={onClick} size="medium">
        Create account
      </Button>
    </div>
  );
};
