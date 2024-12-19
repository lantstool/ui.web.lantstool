import { Link, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { BackButton } from '../../../_general/BackButton/BackButton.jsx';
import { Button } from '../../../_general/Button/Button.jsx';
import { Empty } from './Empty/Empty.jsx';
import { List } from './List/List.jsx';
import cn from './Networks.module.scss';

export const Networks = () => {
  const { spaceId } = useParams();
  const getAll = useStoreEffect((store) => store.nearProtocol.networks.getAll);
  const ids = useStoreState((store) => store.nearProtocol.networks.ids);

  const [isLoading] = useLoader(getAll, { spaceId });
  useSaveToHistory();

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  return (
    <div className={cn.container}>
      <BackButton />
      <div className={cn.networks}>
        <div className={cn.head}>
          <div className={cn.wrapper}>
            <h1 className={cn.title}>Networks</h1>
            <p className={cn.subtitle}>Here you can manage all networks within this space</p>
          </div>
          <Link to="create">
            <Button size="medium">Add Network</Button>
          </Link>
        </div>
        <List ids={ids} />
      </div>
    </div>
  );
};
