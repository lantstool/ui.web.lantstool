import { Link, useParams } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { Button } from '../../_general/Button/Button.jsx';
import { ArrowLeftOutline } from '../../_general/icons/ArrowLeftOutline.jsx';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { DangerZone } from './DangerZone/DangerZone.jsx';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId } = useParams();
  const space = useStoreState((store) => store.spaces.records[spaceId], [spaceId]);

  if (!space) return null;

  return (
    <div className={cn.settings}>
      <Link className={cn.backBtn} to="/spaces">
        <Button color="tertiary" size="small" IconLeft={ArrowLeftOutline}>
          Back
        </Button>
      </Link>
      <div className={cn.container}>
        <HeadCard space={space} />
        <DangerZone space={space} />
      </div>
    </div>
  );
};
