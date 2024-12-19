import { useParams } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { BackButton } from '../../_general/BackButton/BackButton.jsx';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { DangerZone } from './DangerZone/DangerZone.jsx';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId } = useParams();
  const space = useStoreState((store) => store.spaces.records[spaceId], [spaceId]);

  if (!space) return null;

  return (
    <div className={cn.settings}>
      <BackButton />
      <div className={cn.container}>
        <HeadCard space={space} />
        <DangerZone space={space} />
      </div>
    </div>
  );
};
