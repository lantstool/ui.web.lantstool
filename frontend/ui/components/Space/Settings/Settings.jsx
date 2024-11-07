import { useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId } = useParams();
  const remove = useStoreEffect((store) => store.spaces.remove);
  const navigate = useNavigate();

  const removeSpace = () => remove({ spaceId, navigate });

  return (
    <div className={cn.container}>
      <h1>Settings</h1>
      <button onClick={removeSpace}>Delete Space</button>
    </div>
  );
};
