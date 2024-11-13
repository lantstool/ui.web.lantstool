import { Link, useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { Button } from '../../_general/Button/Button.jsx';
import { ArrowLeftOutline } from '../../_general/icons/ArrowLeftOutline.jsx';
import { HeadCard } from './HeadCard/HeadCard.jsx';
import { useLoader } from '@hooks/useLoader.js';
import { DangerZone } from './DangerZone/DangerZone.jsx';
import cn from './Settings.module.scss';

export const Settings = () => {
  const { spaceId } = useParams();
  const records = useStoreState((store) => store.spaces.records);
  const getOne = useStoreEffect((store) => store.spaces.getOne);
  const [isLoading, space] = useLoader(getOne, { spaceId }, [records]);

  if (isLoading) return null;

  return (
    <div className={cn.settings}>
      <Link className={cn.backBtn} to="/spaces">
        <Button size="small" IconLeft={ArrowLeftOutline}>
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
