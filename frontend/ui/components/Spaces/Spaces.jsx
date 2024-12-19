import { useStoreEffect, useStoreState } from '@react-vault';
import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { BackButton } from '../_general/BackButton/BackButton.jsx';
import { Empty } from './Empty/Empty.jsx';
import { List } from './List/List.jsx';
import { useLoader } from '@hooks/useLoader.js';
import { Button } from '../_general/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import cn from './Spaces.module.scss';

export const Spaces = () => {
  const ids = useStoreState((store) => store.spaces.ids);
  const getAll = useStoreEffect((store) => store.spaces.getAll);
  const navigate = useNavigate();
  const [isLoading] = useLoader(getAll);

  useSaveToHistory();

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  const handleClick = () => navigate('create');

  return (
    <div className={cn.container}>
      <BackButton />
      <div className={cn.spaces}>
        <div className={cn.head}>
          <div className={cn.wrapper}>
            <h1 className={cn.title}>Spaces</h1>
            <p className={cn.subtitle}>Here you can manage all your spaces.</p>
          </div>
          <Button size="medium" onClick={handleClick}>Create space</Button>
        </div>
        <List ids={ids} />
      </div>
    </div>
  );
};
