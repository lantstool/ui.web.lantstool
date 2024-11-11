import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { Button } from '../../_general/Button/Button.jsx';
import { ArrowLeftOutline } from '../../_general/icons/ArrowLeftOutline.jsx';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId } = useParams();
  const remove = useStoreEffect((store) => store.spaces.remove);
  const navigate = useNavigate();

  useSaveToHistory();

  const removeSpace = () => remove({ spaceId, navigate });

  return (
    <div className={cn.container}>
      <Link className={cn.backBtn} to="/spaces">
        <Button size="small" IconLeft={ArrowLeftOutline}>
          Back
        </Button>
      </Link>
      <h1>Settings</h1>
      <button onClick={removeSpace}>Delete Space</button>
    </div>
  );
};
