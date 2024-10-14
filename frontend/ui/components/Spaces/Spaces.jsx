import { Link } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../react-vault/index.js';
import { useSaveToHistory } from '../../hooks/useSaveToHistory.js';
import { Empty } from './Empty/Empty.jsx';
import { List } from './List/List.jsx';
import { useLoader } from '../../hooks/useLoader.js';
import cn from './Spaces.module.scss';

export const Spaces = () => {
  const ids = useStoreState((store) => store.spaces.ids);
  const getAll = useStoreEffect((store) => store.spaces.getAll);

  const [isLoading] = useLoader(getAll);
  useSaveToHistory();

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <h1>Spaces</h1>
      <Link to="create">Create Space</Link>
      <List ids={ids} />
    </div>
  );
};
