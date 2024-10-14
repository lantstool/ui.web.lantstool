import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../../../react-vault/index.js';
import { useSaveToHistory } from '../../../../../hooks/useSaveToHistory.js';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId, networkId } = useParams();
  const remove = useStoreEffect((store) => store.nearProtocol.networks.remove);
  const navigate = useNavigate();

  useSaveToHistory();
  const removeNetwork = () => remove({ spaceId, navigate, networkId });

  return (
    <div className={cn.container}>
      <h1>Settings</h1>
      <button onClick={removeNetwork}>Delete Network</button>
    </div>
  );
};
