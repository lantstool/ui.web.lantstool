import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '../../../../../react-vault/index.js';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId } = useParams();
  const _deleteSpace = useStoreEffect((store) => store.spaces.deleteSpace);
  const navigate = useNavigate();

  const deleteSpace = () => _deleteSpace({ spaceId, navigate });

  return (
    <div className={cn.container}>
      <h1>Settings</h1>
      <button onClick={deleteSpace}>Delete Space</button>
    </div>
  );
};
