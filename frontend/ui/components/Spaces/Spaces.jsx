import { Link } from 'react-router-dom';
import { useStoreEffect } from '../../../../react-vault/index.js';
import { Empty } from './Empty/Empty.jsx';
import { useLoader } from '../../hooks/useLoader.js';
import cn from './Spaces.module.scss';

export const Spaces = () => {
  const getAll = useStoreEffect(store => store.spaces.getAll);
  const list = [];
  const [isLoading] = useLoader(getAll);
  // кожного разу при заході на сторінку завантажувати спейси з бази.

  if (list.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <h1>Spaces</h1>
      <Link to="create">Create Space</Link>
    </div>
  );
};
