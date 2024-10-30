import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '@react-vault';
import { useLoader } from '@hooks/useLoader.js';
import { Empty } from '../Empty/Empty.jsx';
import { useState } from 'react';
import { KeyList } from './KeyList/KeyList.jsx';
import { Button } from '../../../../../_general/Button/Button.jsx';
import { ImportKeyModal } from '../../_general/ImportKeyModal/ImportKeyModal.jsx';
import cn from './List.module.scss';

export const List = () => {
  const { spaceId, networkId } = useParams();
  const [isOpen, setOpen] = useState(false);
  const ids = useStoreState((store) => store.nearProtocol.keys.ids);
  const getKeyList = useStoreEffect((store) => store.nearProtocol.keys.getKeyList);

  const [isLoading] = useLoader(getKeyList, { spaceId, networkId });

  if (isLoading) return null;
  if (ids.length === 0) return <Empty />;

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <div className={cn.topbar}>
          <div className={cn.wrapper}>
            <h1 className={cn.title}>Keys</h1>
            <p className={cn.subtitle}>Here you'll find the keys used throughout this space.</p>
          </div>
          <Button size="medium" onClick={openModal}>
            Import
          </Button>
        </div>
      </div>
      <KeyList ids={ids} />
      <ImportKeyModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};
