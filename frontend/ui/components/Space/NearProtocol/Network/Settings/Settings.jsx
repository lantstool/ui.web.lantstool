import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { Button } from '../../../../_general/Button/Button.jsx';
import { ArrowLeftOutline } from '../../../../_general/icons/ArrowLeftOutline.jsx';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { DangerZone } from './DangerZone/DangerZone.jsx';
import cn from './Settings.module.scss';

export const Settings = () => {
  const navigate = useNavigate();
  const { networkId } = useParams();
  const network = useStoreState(
    (store) => store.nearProtocol.networks.records[networkId],
    [networkId],
  );

  if (!network) return null;

  return (
    <div className={cn.settings}>
      <div className={cn.container}>
        <HeadCard network={network} />
        {/*<DangerZone network={network} />*/}
      </div>
    </div>
  );
};
